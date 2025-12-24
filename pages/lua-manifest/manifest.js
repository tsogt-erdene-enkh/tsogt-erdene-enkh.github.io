async function generateManifest() {
    const input = document.getElementById('appid').value.trim();
    if (!input) return; // If no input, do nothing

    const match = input.match(/(?:https?:\/\/store\.steampowered\.com\/app\/|)(\d+)/i);
    const appid = match ? match[1] : input;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Fetching..."; 

    const apiUrl = `https://api.github.com/repos/SteamAutoCracks/ManifestHub/git/trees/${appid}?recursive=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Could not fetch data.");

        const treeData = await response.json();
        const files = treeData.tree.filter(file => file.type === 'blob');
        if (files.length === 0) throw new Error("No files found.");

        const zip = new JSZip();
        let totalSize = 0;

        for (const file of files) {
            const fileResponse = await fetch(`https://raw.githubusercontent.com/SteamAutoCracks/ManifestHub/${appid}/${file.path}`);
            const contentBlob = await fileResponse.blob();
            zip.file(file.path, await contentBlob.arrayBuffer());
            totalSize += contentBlob.size;
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const downloadUrl = URL.createObjectURL(zipBlob);

        resultDiv.innerHTML = `
                    <h2>Manifest generated</h2>
                    <p>AppID: ${appid}</p>
                    <p>Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB</p>
                    <a href="${downloadUrl}" download="${appid}.zip">Download Manifest</a>
                `;
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">${err.message} This is due to either Bold's fart has affected GitHub's server or something else.</p>`;
    }
}