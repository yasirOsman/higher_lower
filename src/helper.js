//assigns a value to the cards depending on what the card is
const cardValue = ( card ) => {
    if(card != null){
        // const value = card.split('') 
        const value = card.slice(0,card.length -1)
        switch(value) {
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":
                return 14;
            default:
                return value;
        }
    }
}

//imports all card images in one go
const importAll = (r) => {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}


//creates a new deck of cards and shuffles by sorting it depending on a random number
const createDeck = () => {
    const types = ["D", "C", "H", "S"];
    const values = ["A","K","Q","J", 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cardDeck = [];
    
    for (const t of types) {
      for (const v of values) {
        cardDeck.push(`${v}${t}`);
      }
    }
    
    return cardDeck.sort(() => Math.random() - 0.7);
}

//stores the wins and losses to the localstorage
const setResults = (result) =>{
    if(localStorage.getItem(result) === null){
        localStorage.setItem(result, 1);
        return;
    }
    
    const prevValue = JSON.parse(localStorage.getItem(result))

    localStorage.setItem(result, JSON.stringify(prevValue + 1))
}

//fetches the wins and losses from the localstorage
const getResults = (result) =>{
    if(localStorage.getItem(result) === null){
        return 0;
    }
    
    return JSON.parse(localStorage.getItem(result));
}

export {cardValue, importAll, createDeck, setResults, getResults };



