const containerFavs = document.querySelector('.gifos-favoritos');
const containerTrend = document.querySelector('.trending-gall');
const contentDivEmpty = document.querySelector('save-screen-favoritos');

let favsArray = [];

if(localStorage.getItem('favoritosUrl') != null) {
    if(JSON.parse(localStorage.getItem('favoritosUrl')).length != 0) {

        containerFavs.classList.add('container-search');
        console.log('vacio');
        containerFavs.innerHTML = " ";
        let itemStorage = JSON.parse(localStorage.getItem('favoritosUrl'));
        
        itemStorage.forEach(element => {
            let urlGif = `https://media.giphy.com/media/${element}/giphy.gif`;
            const cardTest = createCard('like');
            console.log(urlGif);
            cardTest.style.backgroundImage = "url('"+urlGif+"')";
            containerFavs.insertBefore(cardTest, containerFavs.firstChild);
        });
    
    
        containerFavs.querySelectorAll('.gif-card').forEach(item => {  
                    
            item.querySelector('.like').addEventListener('click', event => {
                
                getLike(item, '.like');
                
            });

            addLikeClass (item, '.like');
            
        });
    
        containerTrend.querySelectorAll('.gif-card').forEach(item => {  
    
            item.querySelector('.like-trend').addEventListener('click', event => {
                
                getLike(item, '.like-trend');
                
            });

            addLikeClass (item, '.like');
            
        });
    
    } else if (localStorage.getItem('favoritosUrl') == null || JSON.parse(localStorage.getItem('favoritosUrl')).length == 0) {
        containerFavs.classList.remove('container-search');
    }
}


window.addEventListener('load', (event) => {
    
    if(localStorage.getItem('favoritosUrl') == null) {

    }
    
});


function getLike (item, class1) {
    let buttonLike = item.querySelector(class1);
    let str = item.style.backgroundImage;
    let urlGifFav2 = str.substring(str.indexOf('"')+ 1, str.lastIndexOf('"'));
    let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
    
    if (localStorage.getItem('favoritosUrl') == null) {
        localStorage.setItem('favoritosUrl'," ");
    }
    
    if(localStorage.getItem('favoritosUrl') === " ") {
        buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
        favsArray.push(urlGifFav);
        localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
        
    } 
    else {
        favsArray = JSON.parse(localStorage.getItem('favoritosUrl'));
        if(favsArray.indexOf(urlGifFav) === -1) {
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
            favsArray.push(urlGifFav);
            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
        } else {
            buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            favsArray.splice(favsArray.indexOf(urlGifFav), 1)
            localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
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