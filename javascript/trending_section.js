//1. Tomar el valor de busqueda para GIFOS

const gifsTrend = []; //Array para Trending Carrusel
const trendingSection = document.querySelector('.trending-gall');

const trendingText = document.querySelector('.trending');

// for Screen MAX funcionality
const headTag = document.getElementsByTagName('header')[0];
const mainTag = document.getElementsByTagName('main')[0];
const footerTag = document.getElementsByTagName('footer')[0];
const bodyTag = document.getElementsByTagName('body')[0];

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
            eventBtnsGif();

        }
    });
    
}

function eventBtnsGif (){
    const container = document.querySelector('.trending-gall');
            
            container.querySelectorAll('.gif-card').forEach(item => {
                
                addLikeClass(item, '.like-trend');
                
                item.querySelector('.like-trend').addEventListener('click', event => {
                    
                    getLike(item, '.like-trend');
                    
                });
                
                item.getElementsByClassName('b-icon')[1].addEventListener('click', () => {
                    let str2 = item.style.backgroundImage;
                    let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
                    window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);
                    
                })
                
                // GIF SCREEN MAX WINDOW 
                item.getElementsByClassName('b-icon')[2].addEventListener('click', () => {
                    
                    let str2 = item.style.backgroundImage;
                    let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
                    let num = 0;
                    
                    gifsTrend.forEach((item) => {
                        
                        if(urlGifFav == item.imageid) {
                            getScreenMax(num, gifsTrend);
                            
                        }
                        num ++;
                    })
                    
                })
                
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
            imageid: 'id'
        }
        gifObject.imageUrl = data.images.original.url;
        if(data.username == "") {
            gifObject.user = 'GIPHY';
        } else {
            gifObject.user = data.username;
        }
        gifObject.title = data.title.split(' GIF')[0];
        gifObject.imageid = data.id;
        gifsTrend.push(gifObject);
    })

    moveCarrusel(gifsTrend);
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
    button_2.getElementsByTagName('img')[0].src = "/assets/icon-download.svg";
    button_3.getElementsByTagName('img')[0].src = "/assets/icon-max.svg";

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



let cardArray = [];

function getLike (item, class1) {
    let buttonLike = item.querySelector(class1);
    let str = item.style.backgroundImage;
    let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));

    //USER and TITLe
    let userName = item.querySelector('.title-card').getElementsByTagName('p')[0].innerHTML;
    let titleGif = item.querySelector('.title-card').getElementsByTagName('h3')[0].innerHTML;
    

    let cardObject = {
        imageUrl: urlGifFav,
        user: userName,
        title: titleGif
    };
    
    if (localStorage.getItem('favoritosUrl') == null) {
        localStorage.setItem('favoritosUrl'," ");
        localStorage.setItem('favobject'," ");
    }
    
    if(localStorage.getItem('favoritosUrl') === " " && localStorage.getItem('favobject') === " ") {
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
            let index = cardArray.findIndex(x => x.imageUrl === urlGifFav);
            cardArray.splice(index,1);
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            favsArray.splice(favsArray.indexOf(urlGifFav), 1);

            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
            localStorage.setItem('favobject',JSON.stringify(cardArray));
        }
    }
};

function addLikeClass (item, class1) {
    if(localStorage.getItem('favoritosUrl') != null) {
        let buttonLike = item.querySelector(class1);
        let str = item.style.backgroundImage;
        let urlGifFav2 = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
        let itemStorage = JSON.parse(localStorage.getItem('favoritosUrl'));
       
        for(let i = 0; i < itemStorage.length; i++ ){
            
            if(itemStorage[i] == urlGifFav2) {
                buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
                break;
            } else {
                buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            }
        }
    }
    
}

function addLikeGifMax (item) {
    if(localStorage.getItem('favoritosUrl') != null) {
        let buttonLike = item.querySelectorAll('.button-icon');
        let str = item.querySelector('.gifo-image-max').style.backgroundImage;
        let urlGifFav2 = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
        let itemStorage = JSON.parse(localStorage.getItem('favoritosUrl'));
        for(let i = 0; i < itemStorage.length; i++ ){
            
            if(itemStorage[i] == urlGifFav2) {
                buttonLike[1].getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
                break;
            } else {
                buttonLike[1].getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            }
        }
    }
}

const btnsCarrusel = document.querySelectorAll('.b-gallery');

function moveCarrusel (array){
    let left = 2;
    let right = 0;
    let limit = array.length;
    console.log(limit);
    
    btnsCarrusel[0].addEventListener('click', ()=> {
        if(right != 0) {
            right = right - 1;
            
            newGif(0, right);
            newGif(1, right+1);
            newGif(2, right+2);

            left = right + 2;
        
        } else {
            right = 0;
            left = right + 2;
        }
    })

    btnsCarrusel[1].addEventListener('click', ()=> {
        
        if(left < limit - 1) {
            
            left = left + 1;
            
            newGif(0, left-2);
            newGif(1, left-1);
            newGif(2, left);
        
            right = left - 2
         
        } else {
            left = limit;
            right = left-2;
        }
    })
    
    function newGif(pos, num) {
        trendingSection.getElementsByClassName('gif-card')[pos].style.backgroundImage = "url('" + array[num].imageUrl + "')";
        trendingSection.getElementsByClassName('gif-card')[pos].getElementsByTagName('p')[0].innerText = array[num].user.toUpperCase();
        trendingSection.getElementsByClassName('gif-card')[pos].getElementsByTagName('h3')[0].innerText = array[num].title;
        addLikeClass(trendingSection.getElementsByClassName('gif-card')[pos], '.like-trend')
    }
}



// SCREEN MAX GIFO

function getScreenMax (index, array) {
    
    const div = document.createElement('div');
    div.classList.add('container-gif');
    div.innerHTML = screenMax;
    
    
    hideSections();
    bodyTag.appendChild(div);

    const contentGif = document.querySelector('.container-gif');    
    let closeWindow = contentGif.getElementsByClassName('button-icon')[0];
    let likeBtn = document.getElementsByClassName('button-icon')[1];
    let getGif = document.getElementsByClassName('button-icon')[2];
    const previewGif = contentGif.getElementsByClassName('b-gallery')[0];
    const nextGif = contentGif.getElementsByClassName('b-gallery')[1];
    let divMAx = contentGif.querySelector('.gif-icons-screen');
    let gifPic = contentGif.querySelector('.gifo-image-max');
    let urlGif;
    
    let numleft = index;
    let numright = index;
    let limit = array.length;
    
    addGifPic(index);
    addLikeGifMax(contentGif);
    
    previewGif.addEventListener('click', () => {
        
        if(numright != 0) {
            numright = numright - 1;
            addGifPic(numright);
            addLikeGifMax(contentGif);
            numleft = numright
        } else {
            numright = 0;
            numright = numleft;
        }
        
    })
    
    nextGif.addEventListener('click', () => {
        
        if(numleft < limit - 1) {
            numleft = numleft + 1;
            addGifPic(numleft);
            addLikeGifMax(contentGif);
            numright = numleft
        } else {
            numleft = limit;
            numleft = numright;
        }
        
    })

    likeBtn.addEventListener('click', () => {
        getLikeGifMax();
        
    })

    getGif.addEventListener('click', () => {
        let str2 = gifPic.style.backgroundImage;
        let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
        window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);
    })
    
    closeWindow.addEventListener('click', () => {
        div.remove();
        showSections();
        const container = document.querySelector('.trending-gall');
        container.querySelectorAll('.gif-card').forEach(item => {
            addLikeClass(item, '.like-trend');
        })
        location.reload();
    })
    
    function addGifPic (index) {
        urlGif = `https://media.giphy.com/media/${array[index].imageid}/giphy.gif`;
        gifPic.style.backgroundImage = "url('"+urlGif+"')";
        divMAx.getElementsByTagName('p')[0].innerHTML = array[index].user;
        divMAx.getElementsByTagName('p')[1].innerHTML = array[index].title;
    }
    
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
<button class="button-icon b-icon-2 like2"><img src="/assets/icon-fav-hover.svg" alt="icon fav"></button>
<button class="button-icon b-icon-2"><img src="/assets/icon-download.svg" alt="icon fav"></button>
</div>
</div>
</section>`;


function hideSections (){
    headTag.style.display = 'none';
    mainTag.style.display = 'none';
    footerTag.style.display = 'none';
}

function showSections (){
    headTag.style.display = 'flex';
    mainTag.style.display = 'block';
    footerTag.style.display = 'flex';
}

function getLikeGifMax () {
    const gifo = document.querySelector('.gifo-image-max');
    let buttonLike = document.querySelector('.like2');
    
    let str = gifo.style.backgroundImage;
    let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
    
    //USER and TITLe
    let userName = document.getElementsByClassName('text-p1')[0].innerHTML;
    let titleGif = document.getElementsByClassName('text-p1')[1].innerHTML;
    
    let cardObject = {
        imageUrl: urlGifFav,
        user: userName,
        title: titleGif
    };
    
    if (localStorage.getItem('favoritosUrl') == null) {
        localStorage.setItem('favoritosUrl'," ");
        localStorage.setItem('favobject'," ");
    }
    
    if(localStorage.getItem('favoritosUrl') === " " && localStorage.getItem('favobject') === " ") {
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
            let index = cardArray.findIndex(x => x.imageUrl === urlGifFav);
            cardArray.splice(index,1);
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            favsArray.splice(favsArray.indexOf(urlGifFav), 1);
            
            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
            localStorage.setItem('favobject',JSON.stringify(cardArray));

        }
    }
}