// DOM Theme

const body = document.body;
const themeButton = document.querySelector('.theme-button');
const buttonSearch = document.querySelector('#search__1');
const buttonCreate = document.querySelector('.crear-gif').getElementsByTagName('img')[0];
const buttonArrow = document.getElementsByClassName('b-gallery');


// Apply when reload 

let theme = localStorage.getItem('themegifo');

if(theme == null) {
    localStorage.setItem('themegifo', body.className);
}


if (theme) {
    body.classList.add(theme);
    swapImages(theme);
}

themeButton.addEventListener('click', () => {
    
    theme = localStorage.getItem('themegifo');

    if(theme === 'theme-day') {
        themeButton.innerText = 'Modo Diurno';
        swapImages('theme-night');
        body.classList.replace('theme-day', 'theme-night');
        localStorage.setItem('themegifo', 'theme-night');
        

    } else if(theme === 'theme-night') {
        themeButton.innerText = 'Modo Nocturno';
        swapImages('theme-day');
        body.classList.replace('theme-night', 'theme-day');
        localStorage.setItem('themegifo', 'theme-day');
       

    }

    console.log(theme);
    
})

function swapImages (theme) {

    if(theme === 'theme-night') {
        buttonSearch.style.backgroundImage = "url(../assets/icon-search_white.svg)";
        buttonCreate.src = "../assets/button-crear-gifo_white.svg";
        // buttonArrow[0].style.backgroundImage = "url(../assets/button-left-white.svg)";
        // buttonArrow[1].style.backgroundImage = "url(../assets/button-right-white.svg)";
 
    } else if(theme === 'theme-day') {
        buttonSearch.style.backgroundImage = "url(../assets/icon-search.svg)";
        buttonCreate.src = "../assets/button-crear-gifo.svg";
        // buttonArrow[0].style.backgroundImage = "url(../assets/button-left.svg)";
        // buttonArrow[1].style.backgroundImage = "url(../assets/button-right.svg)";
    }

}
