// DOM Theme

const body = document.body;
const themeButton = document.querySelector('.theme-button');
const camera = document.querySelector('.camera');
const moviePic = document.querySelector('.movie');


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
        camera.src = '/assets/camara-modo-noc.svg';
        moviePic.src = '/assets/pelicula-modo-noc.svg'
        
    } else if(theme === 'theme-day') {
        camera.src = '/assets/camara.svg';
        moviePic.src = '/assets/pelicula.svg'
    }

}