// DOM Theme

const body = document.body;
const themeButton = document.querySelector('.theme-button');


// Apply when reload 

let theme = localStorage.getItem('themegifo');

if (theme) {
    body.classList.add(theme);
}

themeButton.addEventListener('click', () => {
    
    theme = localStorage.getItem('themegifo');

    if(theme === 'theme-day') {
        body.classList.replace('theme-day', 'theme-night');
        localStorage.setItem('themegifo', 'theme-night');

    } else if(theme === 'theme-night') {
        body.classList.replace('theme-night', 'theme-day');
        localStorage.setItem('themegifo', 'theme-day');
    }

    console.log(theme);
    
})
