const quotesContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

const apis = [
    {url: 'https://favqs.com/api/qotd', isArray: false, obj: 'quote', text: 'body', author: 'author'},
    {url: 'https://type.fit/api/quotes', isArray: true, obj: '', text: 'text', author: 'author'},
    {url: 'https://api.chucknorris.io/jokes/random', isArray: false, obj: '', text: 'value', author: ''},
    {url: 'https://www.breakingbadapi.com/api/quotes', isArray: true, obj: '', text: 'quote', author: 'author'}
];

const apiDefault = {url: './data.json', isArray: true, obj: '', text: 'text', author: 'author'};

async function getQuotes() {
    let res = null;
    let data = null;
    let apiIndex = null;
    for (let i = 0; i < 4; i++) {
        try {
            res = await fetch(apis[i].url);
            data = await res.json();
        } catch(e) {
            console.log(e);
            data = null;
        }
        if (data !== null) {
            data = data;
            apiIndex = i;
            break;
        }
    }
    if (data === null) {
        res = await fetch(apiDefault.url);
        data = await res.json();
        let randomIndex = Math.floor(Math.random() * (data.length - 1));
        let quoteObject = data[randomIndex];
        quote.textContent = quoteObject[apis[apiIndex].text];
        author.textContent = quoteObject[apis[apiIndex].author];
    } else {
        if (apis[apiIndex].isArray) {
            let randomIndex = Math.floor(Math.random() * (data.length - 1));
            let quoteObject = data[randomIndex];
            quote.textContent = quoteObject[apis[apiIndex].text];
            author.textContent = quoteObject[apis[apiIndex].author];
        } else {
            if (apis[apiIndex].obj !== '') {
                data = data[apis[apiIndex].obj];
            }
            quote.textContent = data[apis[apiIndex].text];
            if (apis[apiIndex].author === '') {
                author.textContent = 'Chuck Norris';
            } else {
                author.textContent = data[apis[apiIndex].author];
            }
        }
    }
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);