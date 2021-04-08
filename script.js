
// "https://newsapi.org/v2/top-headlines?country=us&cb7543222fe6414f8180cd191cc7a217=___OUR_API_KEY___"

const url = "https://newsapi.org/v2/top-headlines?apiKey=cb7543222fe6414f8180cd191cc7a217";
let userLanguage = "us";


async function fetchData() {
    const response = await fetch(url + `&country=${userLanguage}`) ;
    const data = await response.json();
    renderArticles(data.articles)   
    console.log({data})  
}
    fetchData(); 


function renderArticles(articles) {
    console.log({aSingleArticle: articles[0]})
    const articlesHTMLArray = articles.map(a => {
        return ` <div class="card mb-5" style ="
        box-shadow:20px 20px 10px grey; ">
        <img src="${a.urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
            <div style = "font-size: small; font-style: italic; display: flex; justify-content: space-between">
                <div>${a.source.name} </div>
                <div> ${moment(a.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <div> ${moment(a.publishedAt).startOf('minutes').fromNow()} </div>
            </div>
            <div style = "font-size: medium; margin-top: 10px"> ${a.author} </div>
          <h5 class="card-title">${a.title}</h5>
          <p class="card-text">${a.description}</p>
          <a href="${a.url}" class="card-link">Link</a>
        </div>
      </div>`
    })
     document.getElementById('new-list').innerHTML = articlesHTMLArray.join('');
}

function selectLanguage(language) {
    userLanguage = language;
    console.log({userLanguage})
    fetchData(); 
}

function searchTitle(title) {
    searchForTitle = title;
}