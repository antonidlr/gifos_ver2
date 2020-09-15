const bStart = document.querySelector('.start-video');
const mainText = document.querySelector('.main-video');
const getIcons = document.getElementsByClassName('chapter-icon');
const recordSection = document.querySelector('.video-chapter');

//VIDEO RECORDING
let videoStream = null;
let videoRecorder = null;
let gifRecorder = null;


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
            video: { width: 838, height: 434 }
            
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
            video: { width: 838, height: 434 }
            
        })

        startVideo(videoStream, videoWidget);

        startRecording.addEventListener('click', () => {
            
            startRecording.style.display = 'none';
            let id = 'stop-recording';
            let texto = 'FINALIZAR';
            recordSection.appendChild(addButton(id, texto));
            
            const stopRecording = document.getElementById('stop-recording');
            addTimer(stopRecording);

            stopRecording.addEventListener('click', () => {
                console.log('inside stop recording');
            })

        })

       

    }, 3000)




})

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
    return video;
}


// 1. Start camera Video

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
    
    const timerText = recordSection.getElementsByTagName('p')[0];
    var startTimestamp = moment().startOf("day");
    var interval = setInterval(function() {
        startTimestamp.add(1, 'second');
        timerText.innerHTML = startTimestamp.format('HH:mm:ss');

    }, 1000);
    
    element.addEventListener('click', () => {
        clearInterval(interval);
    })
}
