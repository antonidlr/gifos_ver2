// Container Mis Gifos

const containerMisGifos = document.querySelector('.gifos-favoritos');
const contDiv = document.querySelector('.save-screen-favoritos');


if(localStorage.getItem('misgifos') != null) {
    
    
    containerMisGifos.classList.add('container-search');
    containerMisGifos.innerHTML = " ";
    
    let gifosStorage = JSON.parse(localStorage.getItem('misgifos'));
    
    gifosStorage.forEach(element => {
        let urlGif = `https://media.giphy.com/media/${element}/giphy.gif`;
        const cardTest = createCard('migifo');
        cardTest.style.backgroundImage = "url('"+urlGif+"')";
        cardTest.getElementsByClassName('b-icon')[0].getElementsByTagName('img')[0].src = '/assets/icon_trash.svg'
        containerMisGifos.insertBefore(cardTest, containerMisGifos.firstChild);
        
    });
}

containerMisGifos.querySelectorAll('.gif-card').forEach(item => {  
    
    item.querySelector('.migifo').addEventListener('click', event => {
        
        let gifosStorage = JSON.parse(localStorage.getItem('misgifos'));
        let str = item.style.backgroundImage;
        let urlGifFav = str.substring(str.indexOf('media/')+ 6, str.lastIndexOf('/giphy'));
        
        gifosStorage.splice(gifosStorage.indexOf(urlGifFav), 1);
        localStorage.setItem('misgifos', JSON.stringify(gifosStorage));
    });
    
    item.getElementsByClassName('b-icon')[1].addEventListener('click', () => {
        let str2 = item.style.backgroundImage;
        let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
        
        console.log(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);
        window.open(`https://media.giphy.com/media/${urlGifFav}/giphy.gif`);
        
    });
    
    item.getElementsByClassName('b-icon')[2].addEventListener('click', () => {
        console.log('MAX MAX')
        let gifosStorage = JSON.parse(localStorage.getItem('misgifos'));
        let str2 = item.style.backgroundImage;
        let urlGifFav = str2.substring(str2.indexOf('media/')+ 6, str2.lastIndexOf('/giphy'));
        let num = 0;
        console.log(urlGifFav);
        
        gifosStorage.forEach((item) => {
            
            if(urlGifFav == item) {
                getScreenMax2(num, gifosStorage);
                
            }
            num ++;
        })
        
        
    });
    
    
});

if(localStorage.getItem('misgifos') == "[]"){
    containerMisGifos.classList.remove('container-search');
    containerMisGifos.appendChild(contDiv);
    console.log(contDiv);
}

function getScreenMax2 (index, array) {
    
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
        urlGif = `https://media.giphy.com/media/${array[index]}/giphy.gif`;
        gifPic.style.backgroundImage = "url('"+urlGif+"')";
        divMAx.getElementsByTagName('p')[0].innerHTML = 'GIFOS';
        divMAx.getElementsByTagName('p')[1].innerHTML = 'Mis GIFOS';
    }
    
}