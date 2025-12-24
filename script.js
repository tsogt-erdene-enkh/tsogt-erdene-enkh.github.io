const btnArticle1 = document.getElementById('article-btn-1');
const btnArticle2 = document.getElementById('article-btn-2');
const jsTest = document.getElementById('js-test-btn');

const text2 = document.getElementById('text-2');

const article1 = document.getElementById('article1');
const article2 = document.getElementById('article2');

btnArticle1.addEventListener('click', () => {
    article1.style.display = 'block';  
    article2.style.display = 'none';   
});

btnArticle2.addEventListener('click', () => {
    article1.style.display = 'none';   
    article2.style.display = 'block';  
});

jsTest.addEventListener('click', () => {
    text2.innerText = 'Haha! The content is gone now!';  
});
