//1. Tomar el valor de busqueda para GIFOS

let mainSearch = document.getElementById('searchbar');
let bSearch = document.getElementById('search__1');
const inputTitle = document.getElementsByClassName('active-title'); 

const gifsTrend = []; //Array para Trending Carrusel
const trendingSection = document.querySelector('.trending-gall');

const activeSection = document.querySelector('.active-search');
const barSuggestions = document.querySelector('.search-box-input');
const closeInput = document.querySelector('.close-button');
const inputSection = document.querySelector('.inputbar');
const trendingText = document.querySelector('.trending');
const lineDiv = document.querySelector('.lin-2');
const titleGifs = document.getElementsByClassName('active-title');

const globalDiv = document.querySelector('.container-max');
const subDiv = document.querySelector('.container-submax');

//Suggestions
const btnSuggestion = document.getElementsByClassName('button-search-2');
const btnText = document.getElementsByClassName('button-sug-1');

//Array Favoritos
let favsArray = [];

let inputGifArray = [];
let trendingGifArray = [];

// Get User Input Data GIFO

function getUserInput () {
    const inputValue = mainSearch.value;
    return inputValue;
};

// Searching GIF on Click

bSearch.addEventListener('click', () => {
    inputGifArray = [];
    activeSection.style.display = 'flex';
    searchGif(urlApi, getUserInput());
    inputTitle[0].innerText = getUserInput();
    hideMainbar();
    showBarSuggestions();
    
    
});

// Searchin GIF on ENTER

mainSearch.addEventListener('keyup', (e) => {
    
    if(e.which === 13) {
        inputGifArray = [];
        activeSection.style.display = 'flex';
        searchGif(urlApi, getUserInput());
        inputTitle[0].innerText = getUserInput();
        hideMainbar();
        showBarSuggestions();
    }
});



//2. API from Giphy

const apiKey = '3IXsNj5VZwIO7aLYIaWASyWQyLliVJk4';
const urlApi = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`;
const urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;
const urlSuggestions = `https://api.giphy.com/v1/tags/related/`;

// api.giphy.com/v1/tags/related/{hola}
// https://api.giphy.com/v1/tags/related/hola
// https://api.giphy.com/v1/tags/related/hola?api_key=3IXsNj5VZwIO7aLYIaWASyWQyLliVJk4

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
        dataArrayScreen(resp.data);
        console.log(resp.data);
        console.log(resp.meta);
        console.log(resp.meta.status);
        
        if(resp.meta.status === 200){
            const container = document.querySelector('.container-search');
            
            container.querySelectorAll('.gif-card').forEach(item => {  
                
                addLikeClass (item, '.like');

                item.querySelector('.like').addEventListener('click', event => {
                    
                    getLike(item, '.like');
                    
                });

                item.getElementsByClassName('b-icon')[1].addEventListener('click', () => {
                    let str2 = item.style.backgroundImage;
                    let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
                    console.log(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);
                    window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);

                })
                
            });
            
        }
    });
}

function searchTren(url) {
    apiSearch(url, '')
    .then((data) => {
        const resp = data;
        console.log(resp.data);
        console.log(resp.data.length);
        arrayTrending(resp.data);
        if (resp.meta.status == 200) {
            createTrendCards();
            const container = document.querySelector('.trending-gall');
            let num = 0;
            container.querySelectorAll('.gif-card').forEach(item => {
                
                addLikeClass(item, '.like-trend');
                
                item.querySelector('.like-trend').addEventListener('click', event => {
                    
                    getLike(item, '.like-trend');
                    
                });

                item.getElementsByClassName('b-icon')[1].addEventListener('click', () => {
                    let str2 = item.style.backgroundImage;
                    let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));

                    //console.log(`https://media.giphy.com/media/JhZcAuGjuDmZq/giphy.gif`);
                    window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);

                })
                
                // GIF SCREEN MAX WINDOW 
                item.getElementsByClassName('b-icon')[2].addEventListener('click', () => {
                    
                    let str2 = item.style.backgroundImage;
                    let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
                    console.log(urlGifFav);
                    console.log(gifsTrend);
                    let num = 0;

                    gifsTrend.forEach((item) => {
                            if(urlGifFav == item.imageid) {
                                console.log(item.user);
                                console.log(item.title);
                                console.log('index to use ' + num);
                                getScreenMax(num);
                            }
                           num ++;
                    })

                })
                num++;
            });
            
        }
    }); 
}

//4. Manipulating de DOM with APi Data response

const dataArrayScreen = (resp) => {
    const container = document.getElementsByClassName('container-search')[0];
    container.innerHTML = "";
    
    addSuggestions(resp);
    
    resp.forEach(function(data){
        let cardObject = {
            imageUrl: data.id,
            user: '',
            title: ''
        };
        const cardTest = createCard('like');
        const imageUrl = data.images.original.url;
        
        cardTest.style.backgroundImage = "url('"+imageUrl+"')";
        
        if(data.username == "") {
            cardTest.getElementsByTagName('p')[0].innerText = 'GIPHY';
            cardObject.user = 'GIPHY';
        } else {
            cardTest.getElementsByTagName('p')[0].innerText = data.username.toUpperCase();
            cardObject.user = data.username.toUpperCase();
        }
        cardTest.getElementsByTagName('h3')[0].innerText = data.title.split(' GIF')[0];
        cardObject.title = data.title.split(' GIF')[0];

        container.append(cardTest);
        
        inputGifArray.push(cardObject);
        
    })
    
}

const arrayTrending = (resp) => {
    /*
    const container = document.querySelector('.trending-gall');
    container.innerHTML = ""; */
    resp.forEach(function(data){
        const gifObject = {
            imageUrl: 'url',
            user: 'User',
            title: 'Title',
            imageid: 'id'
        }
        gifObject.imageUrl = data.images.original.url;
        if(data.username == "") {
            gifObject.user = 'GIPHY';
        } else {
            gifObject.user = data.username.toUpperCase();
        }
        gifObject.title = data.title.split(' GIF')[0];
        gifObject.imageid = data.id;
        gifsTrend.push(gifObject);
    })
    
    console.log(resp.length);
}

//5. Creating Card Showing Small GIF Screen Gallery After Search

const createCard = (param) => {
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
    button_1.classList.add(param);
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
        const cardTest = createCard('like-trend');
        cardTest.style.backgroundImage = "url('" + gifsTrend[i].imageUrl + "')";
        cardTest.getElementsByTagName('p')[0].innerText = gifsTrend[i].user.toUpperCase();
        cardTest.getElementsByTagName('h3')[0].innerText = gifsTrend[i].title;
        trendingSection.append(cardTest);
    }
}


//7. INPUT CYCLE


//.search-box-input
//.lin-2
//.active-title
//.b-see-more
//.search-again

function hideMainbar () {
    inputSection.style.display = 'none';
    trendingText.style.display = 'none';
    
}

function showBarSuggestions () {
    barSuggestions.style.display = 'flex';
    lineDiv.style.display = 'block';
    titleGifs[0].style.display = 'block';
    mainSearch.style.marginLeft = '0px';
    document.querySelector('.box-div-1').appendChild(mainSearch);
}

function closeSuggestions () {
    barSuggestions.style.display = 'none';
    inputSection.style.display = 'flex';
}

closeInput.addEventListener('click', () => {
    closeSuggestions();
})

//8. Input Suggestions Search

function addSuggestions (resp) {
    
    for(let i = 0; i < 4; i++) {
        
        btnText[i].textContent = resp[i].title;
    }
    
}

document.querySelectorAll('.btn').forEach(item => {
    item.addEventListener('click', e => {
        contProd++;
        localStorage.setItem('contProd', contProd);
        contador.innerText = " " + contProd;
        //funcion que agrega los productos a un array
    });
});


// Button LIKE CARD

// document.querySelectorAll('.gif-card')[50].style.backgroundImage;
// str.substring(str.indexOf('"')+ 1 , str.lastIndexOf('"'));


//localStorage.setItem('favoritosUrl'," ");

// var names = [];
// names[0] = prompt("New member name?");
// localStorage.setItem("names", JSON.stringify(names));

let cardArray = [];

function getLike (item, class1) {
    let buttonLike = item.querySelector(class1);
    let str = item.style.backgroundImage;
    let urlGifFav2 = str.substring(str.indexOf('"')+ 1, str.lastIndexOf('"'));
    let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));

    //USER and TITLe
    let userName = item.querySelector('.title-card').getElementsByTagName('p')[0].innerHTML;
    let titleGif = item.querySelector('.title-card').getElementsByTagName('h3')[0].innerHTML;
    console.log(userName);
    console.log(titleGif);

    let cardObject = {
        imageUrl: urlGifFav,
        user: userName,
        title: titleGif
    };
    
    if (localStorage.getItem('favoritosUrl') == null) {
        localStorage.setItem('favoritosUrl'," ");
        localStorage.setItem('favobject'," ");
    }
    
    if(localStorage.getItem('favoritosUrl') === " " || localStorage.getItem('favobject') === " ") {
        buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
        favsArray.push(urlGifFav);
        localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
        cardArray.push(cardObject);
        localStorage.setItem('favobject',JSON.stringify(cardArray));
        
    } 
    else {
        favsArray = JSON.parse(localStorage.getItem('favoritosUrl'));
        cardArray = JSON.parse(localStorage.getItem('favobject'));
        
       if(favsArray.indexOf(urlGifFav) === -1) {
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
            favsArray.push(urlGifFav);
            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
            cardArray.push(cardObject);
            localStorage.setItem('favobject',JSON.stringify(cardArray));
        } else {
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            favsArray.splice(favsArray.indexOf(urlGifFav), 1);
            
            let index = cardArray.findIndex(x => x.imageUrl === urlGifFav);
            cardArray.splice(cardArray.indexOf(index),1);
            console.log('this is Index ' + index);
            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
            localStorage.setItem('favobject',JSON.stringify(cardArray));
        }
    }
};

function addLikeClass (item, class1) {
    if(localStorage.getItem('favoritosUrl') != null) {
        let buttonLike = item.querySelector(class1);
        let str = item.style.backgroundImage;
        let urlGifFav = str.substring(str.indexOf('"')+ 1, str.lastIndexOf('"'));
        let urlGifFav2 = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
        let itemStorage = JSON.parse(localStorage.getItem('favoritosUrl'));
       
        for(let i = 0; i < itemStorage.length; i++ ){
            
            if(itemStorage[i] == urlGifFav2) {
                buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
                console.log(i);
            }
        }
    }
    
}

// let arrayFavoritos = [
//     {imageUrl: "YmVNzDnboB0RQEpmLr", user: "GIPHY", title: "Mad Grumpy Cat"}, 
//     {imageUrl: "qShKy3KNSkzVIxBSiI", user: "METS", title: "Napoleon Dynamite Dancing"},
//     {imageUrl: "VtxmM6gtt9Li0", user: "MAUDIT", title: "Looking Bette Davis"}
// ];

// arrayFavoritos.forEach((item) => {
//     if('VtxmM6gtt9Li0' == item.imageUrl) {
//         console.log(item.user);
//         console.log(item.title);
//     }
   
// })



// Download GIFO

function getScreenMax (index) {

      
    subDiv.remove();
    globalDiv.innerHTML = screenMax;
    let closeWindow = document.getElementsByClassName('button-icon')[0];
    const previewGif = document.getElementsByClassName('b-gallery')[0];
    const nextGif = document.getElementsByClassName('b-gallery')[1]
    closeWindow.addEventListener('click', () => {
        globalDiv.innerHTML = " ";
        globalDiv.appendChild(subDiv);
    })

    const divMAx = document.querySelector('.container-max');
    const gifPic = document.querySelector('.gifo-image-max');
    let urlGif = `https://media.giphy.com/media/${gifsTrend[index].imageid}/giphy.gif`;
    // gifPic.style.backgroundImage = "url('"+urlGif+"')";
    // divMAx.getElementsByTagName('p')[0].innerHTML = gifsTrend[index].user;
    // divMAx.getElementsByTagName('p')[1].innerHTML = gifsTrend[index].title;
    addGifPic(index);
    let numleft = index;
    let numright = index;
    let limit = gifsTrend.length;

    gifPic.style.backgroundImage = "url('"+urlGif+"')";
    divMAx.getElementsByTagName('p')[0].innerHTML = gifsTrend[index].user;
    divMAx.getElementsByTagName('p')[1].innerHTML = gifsTrend[index].title;

    previewGif.addEventListener('click', () => {
        if(numright != 0) {
            numright = numright - 1;
            urlGif = `https://media.giphy.com/media/${gifsTrend[numright].imageid}/giphy.gif`;
            gifPic.style.backgroundImage = "url('"+urlGif+"')";
            divMAx.getElementsByTagName('p')[0].innerHTML = gifsTrend[numright].user;
            divMAx.getElementsByTagName('p')[1].innerHTML = gifsTrend[numright].title;
            console.log('index ' + numright);
            numleft = numright
        } else {
            numright = 0;
            numright = numleft;
        }
        
    })

    nextGif.addEventListener('click', () => {
        if(numleft < limit - 1) {
            numleft = numleft + 1;
            urlGif = `https://media.giphy.com/media/${gifsTrend[numleft].imageid}/giphy.gif`;
            gifPic.style.backgroundImage = "url('"+urlGif+"')";
            divMAx.getElementsByTagName('p')[0].innerHTML = gifsTrend[numleft].user;
            divMAx.getElementsByTagName('p')[1].innerHTML = gifsTrend[numleft].title;
            console.log('index ' + numleft);
            numright = numleft
        } else {
            numleft = limit;
            numleft = numright;
        }
        
    })

}

function addGifPic (index) {
    
}




const screenMax = `
<div class="close-2-button">
            <button class="button-icon b-icon-2 b-icon-3"><img src="/assets/button-close.svg" alt="icon fav"></button>
        </div>
        <section class="gif-screen">
            <button class="b-gallery left"></button>
            <div class="gifo-image-max">
                
            </div>
            <button class="b-gallery right"></button>    
        </section>
        <section class="gif-icons-screen">
            <div class="container-icons">
                <div class="gif-icons-text">
                    <p class="text-p1 size-s1">User</p>
                    <p class="text-p1 size-s2">Título GIFO</p>
                </div>
                <div class="icons-gif">
                    <button class="button-icon b-icon-2"><img src="/assets/icon-fav-hover.svg" alt="icon fav"></button>
                    <button class="button-icon b-icon-2"><img src="/assets/icon-download.svg" alt="icon fav"></button>
                </div>
            </div>
        </section>`;


