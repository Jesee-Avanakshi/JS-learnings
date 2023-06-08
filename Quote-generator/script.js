const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText =document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');


let apiQuotes=[];

function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent =quote.author;
    }

    if(quote.text.length >50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent=quote.text;
}

//get quotes from API
async function getQuote(){
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes =await response.json();
        newQuote();
    } catch(error){
        //error here
    }
}

//EventListeners
newQuoteBtn.addEventListener('click', newQuote);

getQuote()

