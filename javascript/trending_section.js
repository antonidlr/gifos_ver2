//1. Tomar el valor de busqueda para GIFOS

const gifsTrend = []; //Array para Trending Carrusel
const trendingSection = document.querySelector('.trending-gall');

const trendingText = document.querySelector('.trending');


//2. API from Giphy

const apiKey = '3IXsNj5VZwIO7aLYIaWASyWQyLliVJk4';
const urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;

// api.giphy.com/v1/tags/related/{hola}
// https://api.giphy.com/v1/tags/related/hola
// https://api.giphy.com/v1/tags/related/hola?api_key=3IXsNj5VZwIO7aLYIaWASyWQyLliVJk4

async function apiSearch (url, input) {

    const resp = await fetch(url + input);

    const data = await resp.json();

    return data;
};

//3. Mostrar en pantalla

function searchTren(url) {
    apiSearch(url, '')
    .then((data) => {
        const resp = data;
        console.log(resp.data);
        console.log(resp.data.length);
        arrayTrending(resp.data);
        if (resp.meta.status == 200) {
            createTrendCards();
        }
    });
    
}

//4. Manipulating de DOM with APi Data response

const arrayTrending = (resp) => {
    /*
    const container = document.querySelector('.trending-gall');
    container.innerHTML = ""; */
    resp.forEach(function(data){
        const gifObject = {
            imageUrl: 'url',
            user: 'User',
            title: 'Title',
            like: false
        }
        gifObject.imageUrl = data.images.original.url;
        if(data.username == "") {
            gifObject.user = 'GIPHY';
        } else {
            gifObject.user = data.username;
        }
        gifObject.title = data.title.split(' GIF')[0];
        gifsTrend.push(gifObject);
    })

    console.log(resp.length);
}

//5. Creating Card Showing Small GIF Screen Gallery After Search

const createCard = () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const div5 = document.createElement('div');
    const button_1 = document.createElement('button');
    const button_2 = document.createElement('button');
    const button_3 = document.createElement('button');
    const img_1 = document.createElement('img');
    const img_2 = document.createElement('img');
    const img_3 = document.createElement('img');
    const p_1 = document.createElement('p');
    const h_1 = document.createElement('h3');
    div1.appendChild(div2);
    div1.appendChild(div3);
    div3.appendChild(div4);
    div3.appendChild(div5);
    div4.appendChild(button_1);
    div4.appendChild(button_2);
    div4.appendChild(button_3);
    div5.appendChild(p_1);
    div5.appendChild(h_1);
    button_1.appendChild(img_1);
    button_2.appendChild(img_2);
    button_3.appendChild(img_3);

    div1.classList.add('gif-card', 'gif-pic', 'card__screen');
    div2.classList.add('second-gif');
    div3.classList.add('hover-gif');
    div4.classList.add('t-icons');
    div5.classList.add('title-card');
    button_1.classList.add('b-icon');
    button_2.classList.add('b-icon');
    button_3.classList.add('b-icon');

    button_1.getElementsByTagName('img')[0].src = "/assets/icon-fav-hover.svg";
    button_2.getElementsByTagName('img')[0].src = "assets/icon-download.svg";
    button_3.getElementsByTagName('img')[0].src = "assets/icon-max.svg";

    return div1;
}

//6. Trending Section Gallery

window.addEventListener('load', (event) => {
    
    searchTren(urlTrending);
    trendingSection.innerHTML = "";
    
});


function createTrendCards () {
    for(let i = 0; i < 3; i++) {
        const cardTest = createCard();
        cardTest.style.backgroundImage = "url('" + gifsTrend[i].imageUrl + "')";
        cardTest.getElementsByTagName('p')[0].innerText = gifsTrend[i].user.toUpperCase();
        cardTest.getElementsByTagName('h3')[0].innerText = gifsTrend[i].title;
        trendingSection.append(cardTest);
    }
}

