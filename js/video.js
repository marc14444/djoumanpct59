const video = document.getElementById('video');
        const playPauseButton = document.getElementById('play-pause');
        const rewindButton = document.getElementById('rewind');
        const fastForwardButton = document.getElementById('fast-forward');

        playPauseButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseButton.textContent = 'Pause';
            } else {
                video.pause();
                playPauseButton.textContent = 'Play';
            }
            console.log("Play");
            
        });

        rewindButton.addEventListener('click', () => {
            video.currentTime -= 10; // Reculer de 10 secondes
        });

        fastForwardButton.addEventListener('click', () => {
            video.currentTime += 10; // Avancer de 10 secondes
        });