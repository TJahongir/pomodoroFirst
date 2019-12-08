const app = () => {
    // Constants

    // Btns
    const startBtn = document.querySelector('#start');
    const stopBtn = document.querySelector('#stop');
    const settingsBtn = document.querySelector('.settings-header');
    const settingsDiv = document.querySelector('.settings');
    const settingsExit = document.querySelector('.settings-exit')
    const activeBtn = document.querySelector('.activeBtn');
    const timeSelect = document.querySelectorAll('.time-select');

    // Durations
    let customDuration = document.querySelector('#duration');
    let customShortBreak = document.querySelector('#shortBreak');
    let customLongBreak = document.querySelector('#longBreak');
    let customDelay = document.querySelector('#delay');
    let timeDisplay = document.querySelector('.time-display');
    
    // Body
    const body = document.querySelector('.body');

    //color
    // Sound
    let sound = new Audio('../sounds/sound1.mp3');


    


    // Duration
    let duration = 6;
    let shortBreak = 2;
    let pomodoroCount = 0;
    let longDuration = 5;


    // Select btn settings in Settings Menu
    function selectItem () {
        // Remove active btn
        removeBtn();
        // Add active btn
        this.classList.add('activeBtn')
        if (!this.getAttribute('data-primary')) {
            duration = (parseInt(customDuration.value, 10)) * 60;
            shortBreak = (parseInt(customShortBreak.value, 10)) * 60;
            longBreak = (parseInt(customLongBreak.value, 10)) * 60;
            
        } else {
            duration = parseInt(this.getAttribute('data-primary'),10);
            shortBreak = parseInt(this.getAttribute('data-shortBreak'),10);
            longBreak = parseInt(this.getAttribute('data-longbreak'),10);
        }

        

        // Checking if Custom button was selected
        if(this.textContent == 'CUSTOM') {
            document.querySelector('.settings-form').classList.remove('hide');
        } else {
            document.querySelector('.settings-form').classList.add('hide');
        } 

    }

    const removeBtn = () => {
        timeSelect.forEach(item => {
            item.classList.remove('activeBtn');
        })
    }

    timeSelect.forEach(option => {
        option.addEventListener('click', selectItem);
    })

    function checkPause(pause, name) {
        if(pause == true) {
            return clearInterval(name);
        }
    }

    // Color change 
    const colorChange = (color) => {
        body.style.backgroundColor = color;
        settingsDiv.style.color = color;
        timeSelect.forEach(timeItem => {
            timeItem.style.color = color;
            activeBtn.style.color = '#fff';
            activeBtn.style.backgroundColor = '#30b355';
            timeItem.style.borderColor = color;
        })

    }
    // Timer
    function startTimer(check, duration, display) {
        if (check == true) {
            var timer = duration;
            let interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
            
            checkPause();

            if (--timer < 0) {
                clearInterval(interval)
                sound.play();
                pomodoroCount++;
                if(pomodoroCount  <= 7 ) {
                    startTimer(true, shortBreak, display);
                    colorChange("#30b355")
                    console.log(pomodoroCount);
                } else if (pomodoroCount == 8){
                    startTimer(true, longDuration, display);
                    pomodoroCount = 0;
                    colorChange("#30b355")
                    return;
                }

            }
            }, 1000);
        } else {
            return
        }
        
    }

    // Start

    startBtn.addEventListener('click' , () =>  {
        if(startBtn.textContent === 'START') {
            startBtn.textContent = 'PAUSE';
            stopBtn.classList.remove('noHover');
            stopBtn.disabled = false;
            startTimer(true, duration,timeDisplay);
        } else if (startBtn.textContent === 'PAUSE'){
            startBtn.textContent = 'RESUME';
            checkPause(true, 'interval');
            
        } else {
            startBtn.textContent = 'PAUSE';
            startTimer(duration,timeDisplay);
        }
    });
    
    stopBtn.addEventListener('click' , () =>  {
        if(stopBtn.textContent === 'DONE') {
            startTimer(false);
            startBtn.textContent = 'START';
            stopBtn.classList.add('noHover');
            stopBtn.disabled = true;
            timeDisplay.textContent = '0:00';
            colorChange('#ff6565');
        }
    });

    // Showing and hiding Settings Menu
    settingsBtn.addEventListener('click', () => {
        settingsDiv.classList.replace('hide-set', 'show-set');
    })

    settingsExit.addEventListener('click', () => {
        settingsDiv.classList.replace('show-set', 'hide-set');
    })
};
app();