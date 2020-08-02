//1. Tomar el valor de busqueda para GIFOS

let mainSearch = document.getElementById('searchbar');
let bSearch = document.getElementById('search__1'); 

// Get User Input Data GIFO

function getUserInput () {
    const inputValue = mainSearch.value;
    return inputValue;
};

// Searching GIF on Click

bSearch.addEventListener('click', () => {
    
    searchGif(urlTrending, getUserInput());

});

// Searchin GIF on ENTER

mainSearch.addEventListener('keyup', (e) => {

    if(e.which === 13) {
        console.log(getUserInput());
    }
});



//2. API from Giphy

const apiKey = 'fY0DV3ScDCdATmHGEB888sSrIs2klqUD';
const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`;
const urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;


async function apiSearch (url, input) {

    const resp = await fetch(url + input);

    const data = await resp.json();

    return data;
};

//3. Mostrar en pantalla

function searchGif(url, input) {
    apiSearch(url, input)
    .then((data) => {
        const resp = data;
        console.log(resp.data);
        console.log(resp.meta);
        console.log(resp.meta.status);
    })
}

//4. Crear Card con GIF

let cardMain = document.getElementById('card__main');
let cardTest = cardMain;
cardTest.setAttribute("id","newgifocard");
cardTest.classList.add('imggifo'+'hola');