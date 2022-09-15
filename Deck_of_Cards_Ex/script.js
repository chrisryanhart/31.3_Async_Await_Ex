// 1. Request card from a newly shuffled deck
// log the value and suit

// 2. 

let testArr = [];

// axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(res => {
//         let deck_id = res.data.deck_id;
//         // console.log(res.data.deck_id);
//         return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then(firstDraw => {
//         let deck_id = firstDraw.data.deck_id
//         testArr.push(firstDraw);
//         console.log(`Value: ${firstDraw.data.cards[0].value}`)
//         console.log(`Suit: ${firstDraw.data.cards[0].suit}`)

//         return axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//     })
//     .then(secondDraw => {
//         testArr.push(secondDraw);
//         console.log(`Value: ${secondDraw.data.cards[0].value}`)
//         console.log(`Suit: ${secondDraw.data.cards[0].suit}`)
//     });

async function startAndDrawTwice(){
    let res1 = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    let deck_id = res1.data.deck_id;

    let firstDraw = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    console.log(`Value: ${firstDraw.data.cards[0].value}`)
    console.log(`Suit: ${firstDraw.data.cards[0].suit}`)
    console.log(`Remaining: ${firstDraw.data.remaining}`)


    let secondDraw = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    console.log(`Value: ${secondDraw.data.cards[0].value}`)
    console.log(`Suit: ${secondDraw.data.cards[0].suit}`)
    console.log(`Remaining: ${secondDraw.data.remaining}`)
}

startAndDrawTwice();

// ******************************************************************
// 3. Only the code below applies!!
// Upon page load, shuffle new deck
// Press button until no cards left

let game_deck_id = [];

// function shuffleDeck(){
//     axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(res => {
//         game_deck_id.push(res.data.deck_id);
//         return game_deck_id;
//     });
// }

async function shuffleDeck(){
    let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    game_deck_id.push(res.data.deck_id);
}

// function getNewCard(){
//     // if remaing === 0, hide button
//     let deck_id = game_deck_id[0]
//     axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//         .then(res => {
//             // let deck_id = firstDraw.data.deck_id;
//             // testArr.push(firstDraw);
//             console.log(`Value: ${res.data.cards[0].value}`);
//             console.log(`Suit: ${res.data.cards[0].suit}`);
//             console.log(`Remaining: ${res.data.remaining}`);

//             addElement(res.data.cards[0].image)

//             if (res.data.remaining === 0){
//                 $('#new-card').hide();
//             }
//         });
//     }

async function getNewCard(){
    let deck_id = game_deck_id[0];
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

    console.log(`Value: ${res.data.cards[0].value}`);
    console.log(`Suit: ${res.data.cards[0].suit}`);
    console.log(`Remaining: ${res.data.remaining}`);

    addElement(res.data.cards[0].image);

    if (res.data.remaining === 0){
        $('#new-card').hide();
    };
};



function addElement(image){
    $('#container').empty();
    $newImg = `<img src=${image} alt=""></img>`;
    $('#container').append($newImg)
}

$('#new-card').on('click',getNewCard)
$(window).on('load',shuffleDeck);