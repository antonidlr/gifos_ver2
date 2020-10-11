const containerFavs = document.querySelector('.gifos-favoritos');
const containerTrend = document.querySelector('.trending-gall');
const contentDivEmpty = document.querySelector('save-screen-favoritos');

let favsArray = [];
let gifsFavs = [];


if(localStorage.getItem('favoritosUrl') != null) {
    let itemStorage2 = JSON.parse(localStorage.getItem('favobject'));

    itemStorage2.forEach((item2) => {
        let gifObject2 = {
            imageUrl: 'url',
            user: 'User',
            title: 'Title',
            imageid: 'id'
        }
        gifObject2.imageUrl = item2.imageUrl;
        gifObject2.user = item2.user;
        gifObject2.title = item2.title;
        gifObject2.imageid = item2.imageUrl;
    
        gifsFavs.unshift(gifObject2);
    })

    if(JSON.parse(localStorage.getItem('favoritosUrl')).length != 0) {

        containerFavs.classList.add('container-search');
        containerFavs.innerHTML = " ";
        let itemStorage = JSON.parse(localStorage.getItem('favobject'));
        
        itemStorage.forEach(element => {
            let urlGif = `https://media.giphy.com/media/${element.imageUrl}/giphy.gif`;
            const cardTest = createCard('like');
            
            cardTest.style.backgroundImage = "url('"+urlGif+"')";
            cardTest.getElementsByTagName('p')[0].innerHTML = element.user;
            cardTest.getElementsByTagName('h3')[0].innerHTML = element.title;
            containerFavs.insertBefore(cardTest, containerFavs.firstChild);
        });
        

    
        containerFavs.querySelectorAll('.gif-card').forEach(item => {  
                    
            item.querySelector('.like').addEventListener('click', event => {
                
                getLike(item, '.like');
                
            });

            addLikeClass (item, '.like');

            item.getElementsByClassName('b-icon')[1].addEventListener('click', () => {
                let str2 = item.style.backgroundImage;
                let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));

                window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);

            })

            item.getElementsByClassName('b-icon')[2].addEventListener('click', () => {
                console.log('get MAX')
                let str2 = item.style.backgroundImage;
                let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
                let num = 0;
                console.log(urlGifFav);

                gifsFavs.forEach((item) => {
                  
                    if(urlGifFav == item.imageUrl) {
                        getScreenMax(num, gifsFavs);
                        
                    }
                    num ++;
                })
                
            })
            
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
};




// function getLike (item, class1) {
//     let buttonLike = item.querySelector(class1);
//     let str = item.style.backgroundImage;
//     let urlGifFav2 = str.substring(str.indexOf('"')+ 1, str.lastIndexOf('"'));
//     let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));

//     //USER and TITLe
//     let userName = item.querySelector('.title-card').getElementsByTagName('p')[0].innerHTML;
//     let titleGif = item.querySelector('.title-card').getElementsByTagName('h3')[0].innerHTML;
    

//     let cardObject = {
//         imageUrl: urlGifFav,
//         user: userName,
//         title: titleGif
//     };
    
//     if (localStorage.getItem('favoritosUrl') == null) {
//         localStorage.setItem('favoritosUrl'," ");
//         localStorage.setItem('favobject'," ");
//     }
    
//     if(localStorage.getItem('favoritosUrl') === " " && localStorage.getItem('favobject') === " ") {
//         buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
//         favsArray.push(urlGifFav);
//         localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
//         cardArray.push(cardObject);
//         localStorage.setItem('favobject',JSON.stringify(cardArray));
        
//     } 
//     else {
//         favsArray = JSON.parse(localStorage.getItem('favoritosUrl'));
//         cardArray = JSON.parse(localStorage.getItem('favobject'));
        
//        if(favsArray.indexOf(urlGifFav) === -1) {
//             buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-active.svg';
//             favsArray.push(urlGifFav);
//             localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
//             cardArray.push(cardObject);
//             localStorage.setItem('favobject',JSON.stringify(cardArray));
//         } else {
//             buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
//             favsArray.splice(favsArray.indexOf(urlGifFav), 1);
            
//             let index = cardArray.findIndex(x => x.imageUrl === urlGifFav);
//             cardArray.splice(cardArray.indexOf(index),1);
            
//             localStorage.setItem('favoritosUrl', JSON.stringify(favsArray));
//             localStorage.setItem('favobject',JSON.stringify(cardArray));
//         }
//     }
// };

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
                break;
            } else {
                buttonLike.getElementsByTagName('img')[0].src = '../assets/icon-fav-hover.svg';
            }
        }
    }
    
}

