
// "https://newsapi.org/v2/top-headlines?country=us&cb7543222fe6414f8180cd191cc7a217=___OUR_API_KEY___"

const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=cb7543222fe6414f8180cd191cc7a217";


function fetchData() {

    const promise = fetch(url);
    promise
        .then(res => res.json())
        .then((data) => renderArticles(data.articles));
       
}
    fetchData(); 

    
function renderArticles(articles) {
    console.log({aSingleArticle: articles[0]})
    const articlesHTMLArray = articles.map(a => {
        return ` <h1>${a.title} </h1>`
    })
     document.getElementById('new-list').innerHTML = articlesHTMLArray.join('');
}