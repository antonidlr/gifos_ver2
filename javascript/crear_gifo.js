const bStart = document.querySelector('.start-video');
const mainText = document.querySelector('.main-video');
const getIcons = document.getElementsByClassName('chapter-icon');
const recordSection = document.querySelector('.video-chapter');

const mainSection = recordSection.querySelector('.chapter');
const timer = mainSection.getElementsByTagName('p')[0];
const repeatTime = recordSection.querySelector('.chapter-repeat');

let imageGif;


//VIDEO RECORDING
let videoStream = null;
let videoRecorder = null;
let gifRecorder = null;
var stopTimer = null;

// COMENZAR Button

bStart.addEventListener('click', () => {
    
    clearContainer(mainText);
    mainText.innerHTML = `<h2 class="main-title-1">¿Nos das acceso <br> a tu cámara?</h2>
    <p class="main-text-1">El acceso a tu cámara será válido sólo <br> por el tiempo que estes creando el GIFO.</p>`;
    getIcons[0].classList.add("selected-icon");
    bStart.style.opacity = '0';
    bStart.style.cursor = 'auto';

    setTimeout(async () => {
        bStart.style.display = 'none';
        let id = 'record-gif';
        let texto = 'GRABAR';
        recordSection.appendChild(addButton(id, texto))
        
        getIcons[0].classList.remove("selected-icon");
        getIcons[1].classList.add("selected-icon");
        clearContainer(mainText);
        
        mainText.appendChild(addVideoContainer());

        const videoWidget = document.getElementById('record');
        const startRecording = document.getElementById('record-gif');

        const options = {
            audio: false,
            video: { width: 480, height: 320 }
            
        };
        
        videoStream = await navigator.mediaDevices.getUserMedia(options);
        
        gifRecorder = RecordRTC(videoStream, {
            type: 'gif',
            frameRate: 5,
            quality: 5,
            width: 360,
            hidden: 240,
        });
        
        videoRecorder = RecordRTC(videoStream, {
            type: 'video',
            video: { width: 480, height: 320 }
            
        })

        startVideo(videoStream, videoWidget);

        //Start Video Recording for GIFO

        startRecording.addEventListener('click', () => {
            
            startRecording.style.display = 'none';
            let id = 'stop-recording';
            let texto = 'FINALIZAR';
            recordSection.appendChild(addButton(id, texto));
            
            const stopRecording = document.getElementById('stop-recording');
            addTimer(stopRecording);

            gifRecorder.startRecording();
            videoRecorder.startRecording();


            //Stop Video Recording for GIFO

            function stopRecVideo() { 
                
                clearContainer(mainText);
                mainText.appendChild(createGifTag());
                imageGif = document.getElementById('gifo');
            
                gifRecorder.stopRecording(stopRec);  
                //videoRecorder.stopRecording(stopRec2);
            
                videoStream.getVideoTracks()[0].stop();
                videoWidget.srcObject = null;
                
            }

            setTimeout(function(){ 
                if(gifRecorder != null) {
                stopRecVideo();
                }

                stopRecording.style.display = 'none';
                let id = 'upload-recording';
                let texto = 'SUBIR GIFO';
                recordSection.appendChild(addButton(id, texto));
                addRepeatGif();
                
                
            }, 6000);

            // stopRecording.addEventListener('click', () => {
            //     console.log('inside stop recording');
                
            //     stopRecVideo();

            // })

        })

    }, 3000)

})

//3. Stop Video - FOR VIDEO RECORDING
// const stopRec2 = (stream) => {
//     video.src = URL.createObjectURL(videoRecorder.getBlob());
//     videoRecorder.destroy();
//     videoRecorder = null;
// };

// FOR GIF RECORDING
const stopRec = async (stream) => {
    
    imageGif.src = URL.createObjectURL(gifRecorder.getBlob());

    await sendGif(gifRecorder.getBlob());
    gifRecorder.destroy();
    gifRecorder = null;
    
};

// Send Gif to Giphy



//-------------------------------------------------------

// Clear Container Content
function clearContainer(element) {
    element.innerHTML = "";
}

// Add button Recording and Stop Recording

function addButton(id,texto) {
    const button = document.createElement('button');
    button.classList.add('start-video');
    button.setAttribute('id', id);
    button.innerText = texto;
    return button;
}

// Create Video Element TAG for creating GIFO

function addVideoContainer() {
    const video = document.createElement('video');
    video.setAttribute('id','record');
    video.setAttribute('width','480px');
    video.setAttribute('height','320px');
    return video;
}


// Start camera Video

const startVideo = (stream, videoTag) => {
    videoTag.srcObject = stream;
    videoTag.play();
    
};


// Counter TIME when recording

function startTimer(param)
{
    var startTimestamp = moment().startOf("day");
    setInterval(function() {
        startTimestamp.add(1, 'second');
        timerText.innerHTML = startTimestamp.format('HH:mm:ss');

    }, 1000);
    
}

function addTimer (element) {
    
    //const timerText = recordSection.getElementsByTagName('p')[0];
    var startTimestamp = moment().startOf("day");
    var interval = setInterval(function() {
        startTimestamp.add(1, 'second');
        timer.innerHTML = startTimestamp.format('HH:mm:ss');

    }, 1000);
    
    element.addEventListener('click', () => {
        clearInterval(interval);
    })
}

function createGifTag () {
    const img = document.createElement('img');
    img.setAttribute('id','gifo');
    img.setAttribute('width','480px');
    img.setAttribute('height','320px');
    return img;
}


//6. POST to Giphy


const sendGif = async gif => {
    
    const data = new FormData();
    data.append('file', gif, 'mygifo.gif');
    
    let response = await fetch("https://upload.giphy.com/v1/gifs?api_key=3IXsNj5VZwIO7aLYIaWASyWQyLliVJk4", {
    method: 'POST',
    body: data
    });

    const newGif = response.url;
    console.log (newGif);
   
    const dataResponse = await response.json();

    console.log(response.status);

    if (response.status === 200) {

        //guardar en local storage
        localStorage.setItem("misgifos", saveLocal(dataResponse.data.id));
        
    }
    else {
        alert ('No se ha podido cargar tu gif. Vuelve a intentarlo');
    }

};

// 6.1 Guardar en Local Storage

const saveLocal = (gif) => {
    
   let urlGif = `https://media.giphy.com/media/${gif}/giphy.gif`;

    return urlGif;
}


// Add Button REPETIR CAPTURA

function addRepeatGif() {
    
    timer.style.display = 'none';
    repeatTime.style.display = 'block';
    
}

