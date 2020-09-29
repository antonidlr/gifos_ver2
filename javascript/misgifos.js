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

});

if(localStorage.getItem('misgifos') == "[]"){
    containerMisGifos.classList.remove('container-search');
    containerMisGifos.appendChild(contDiv);
    console.log(contDiv);
}

