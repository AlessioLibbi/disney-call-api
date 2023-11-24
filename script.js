
const apiBaseUrl = "https://api.disneyapi.dev/character";
var names
var characterList = []
//VARIABILI GLOBALI
//////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    characterGeneration(1, 10, names)
    //stampCharacter(characterList)

    input.addEventListener('keyup', () => {

        getFilterValue()
        characterGeneration(1, 10, names)
        //stampCharacter(characterList)
    });


});




function getFilterValue() {
    var input = document.querySelector("#input")
    names = input.value
    console.log(names);
}






// const handleMouseMove = debounce((ev) => {
//     // Do stuff with the event!
// }, 250);




///////////////FUNZIONE PER GENERARE I CHARACTERS IN PG////////
function characterGeneration(page, pageSize, names) {


    getCharacterList(page, pageSize, names).then((characterListToParse) => {
        return characterListToParse.json()
    }).then((characterData) => {
        characterList = characterData.data;
        stampCharacter(characterList)
        console.log(characterList);

    }).catch((e) => alert(e.message));



}


function stampCharacter(characterList) {

    var characterContainer = document.querySelector('#character-row');
    characterContainer.innerHTML = ``

    characterList.forEach(character => {



        let col = document.createElement('div');
        col.classList.add('col');
        let card = document.createElement('div');
        col.appendChild(card)
        console.log(col);
        card.classList.add('card');
        card.classList.add('my-5');
        let imgShowed = document.createElement('img');
        imgShowed.classList.add('img-card')
        imgShowed.src = character.imageUrl;
        card.appendChild(imgShowed);
        let cardBody  = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody._id = "card-" + character._id;
        card.appendChild(cardBody);
        let cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = character.name;
        cardBody.appendChild(cardTitle);
        characterContainer.appendChild(col);
        cardBody = document.getElementById('card-'+character._id);
        console.log(card);
        let btnFra = document.createElement('span');
        btnFra.classList.add('btn-fra');
        btnFra.innerHTML = 'Scopri di pi&ugrave;'
        card.appendChild(btnFra)
        btnFra.addEventListener('click', (e) => singleCharacter(character))
    });


}



//////////////////////////////
//CALL FUNCTION FOR CHARACTERS //////////////
function getCharacterList(page, pageSize, names) {
    console.log(apiBaseUrl + `?page=${page}&pageSize=${pageSize}`)
    if (names) {
        var fullBaseUrl = `${apiBaseUrl}?page=${page}&pageSize=${pageSize}&name=${names}`
    } else {
        fullBaseUrl = apiBaseUrl + `?page=${page}&pageSize=${pageSize}`
    }

    return fetch(fullBaseUrl,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
}







function singleCharacter(character) {

   

    const container = document.querySelector('.container-characters')


    let overlay = document.createElement('div')
    overlay.classList.add('overlay');
    document.body.appendChild(overlay)
    let singleContainer = document.createElement('div')
    singleContainer.classList.add('modal-p');
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    let img = document.createElement("img")
    img.classList.add('modal-img')
    img.src = character.imageUrl
    singleContainer.appendChild(img)
    
        singleContainer.innerHTML += `<p class="card-text">${character.name ? character.name : ""}</p>`
        singleContainer.innerHTML += `<p class="card-text">${character.films ? character.films : ""}</p>`
        singleContainer.innerHTML += `<p class="card-text">${character.tvShows ? character.tvShows : ""}</p>`
        singleContainer.innerHTML += `<p class="card-text">${character.videoGames ? character.videoGames : ""}</p>`
  
    
 

    let btn = document.createElement("a")
    btn.classList.add('btn')
    btn.innerHTML = 'Delete with &hearts;'
    btn.addEventListener('click', (e) => {
        overlay.classList.add('hidden')
        document.getElementsByTagName('body')[0].style.overflow = 'visible'
        deleteChar(singleContainer)

    })
    singleContainer.appendChild(btn)
    container.appendChild(singleContainer)


}
function deleteChar(singleContainer) {
    singleContainer.remove()
}


///////////FUNCTION BASE DEBOUNCE//////////////
//////DA CAPIRE COME FUNZIONA////
// const debounce = (callback, wait) => {
//     let timeoutId = null;
//     return (...args) => {
//         window.clearTimeout(timeoutId);
//         timeoutId = window.setTimeout(() => {
//             callback.apply(null, args);
//         }, wait);
//     };
// }