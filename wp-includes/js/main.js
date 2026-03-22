document.addEventListener('DOMContentLoaded', function () {
    const panels = document.querySelectorAll('.achievement-panel');
    let currentIndex = -1;
    panels.forEach(panel => {
        panel.style.visibility = "hidden";
        panel.classList.remove('visible');
    });

    const svgIcons = document.querySelectorAll('.svg-icon');
    svgIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetPanelId = this.getAttribute('data-panel');
            const nextIndex = Array.from(panels).findIndex(panel => panel.id === targetPanelId);
            if (nextIndex === currentIndex) {
                hidePanel(currentIndex);
                currentIndex = -1;
                return;
            }
            if (nextIndex !== -1 && nextIndex !== currentIndex) {
                const currentPanel = currentIndex >= 0 ? panels[currentIndex] : null;
                if (currentPanel) {
                    const divToSnap = currentPanel.querySelector('#div-to-snap');
                    if (divToSnap) {
                        // Hide video in the div if present
                        const video = divToSnap.querySelector('video');
                        if (video) {
                            video.style.visibility = 'hidden';
                            video.pause(); // Pause the video if it's playing
                        }
    
                        // Hide image in the div if present
                        const image = divToSnap.querySelector('img');
                        if (image) {
                            image.style.visibility = 'hidden';
                        }
                    }
                }
                showLoading(currentPanel);
                disintegratePanel(currentPanel, nextIndex);
            }
        });
    });    
    function showPanel(index) {
        panels.forEach(panel => {
            panel.classList.remove('visible');
            panel.style.visibility = "hidden"; 
        });
        if (index >= 0) {
            const targetPanel = panels[index];
            targetPanel.classList.add('visible');
            targetPanel.style.visibility = "visible"; 
            const divToSnap = targetPanel.querySelector('#div-to-snap');
            if (divToSnap) {
                const allElements = divToSnap.querySelectorAll('*'); 
                allElements.forEach(element => {
                    element.style.visibility = 'visible'; 
                });
                const video = divToSnap.querySelector('video');
                if (video) {
                    video.currentTime = 0; 
                    video.play(); 
                }
            }
        }
        hideLoading(index); // Hide loading spinner once panel is shown
    }


    // Function to hide the panel at the given index
    function hidePanel(index) {
        if (index >= 0) {
            const panel = panels[index];
            panel.classList.remove('visible');
            panel.style.visibility = "hidden";
            const video = panel.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    }

    // Disintegrate current panel and switch to next panel
    function disintegratePanel(currentPanel, nextIndex) {
        if (!currentPanel) {
            showPanel(nextIndex);
            currentIndex = nextIndex;
            return;
        }

        // Pause videos in the current panel
        const videos = currentPanel.querySelectorAll('video');
        videos.forEach(video => video.pause());

        const imageLoadPromises = Array.from(currentPanel.querySelectorAll('img')).map(img => new Promise(resolve => {
            if (img.complete) resolve();
            else {
                img.onload = resolve;
                img.onerror = resolve;
            }
        }));

        const videoLoadPromises = Array.from(videos).map(video => new Promise(resolve => {
            if (video.readyState >= 3) resolve();
            else {
                video.oncanplay = resolve;
                video.onerror = resolve;
            }
        }));

        Promise.all([...imageLoadPromises, ...videoLoadPromises]).then(() => {
            createDisintegrationEffect(currentPanel, nextIndex);
        });
    }
    function showLoading(panel) {
        if (panel) {
            const loadingSpinner = panel.querySelector('.panel-spinner'); 
            const divToSnap = panel.querySelector('#div-to-snap'); 
            if (divToSnap) {
                divToSnap.style.visibility = 'hidden'; 
            }
            if (loadingSpinner) {
                loadingSpinner.style.display = 'block';
            }
        }
    }
    function createDisintegrationEffect(currentPanel, nextIndex) {
        setTimeout(() => {
            currentIndex = nextIndex;
            showPanel(nextIndex);
        }, 1000); 
    }
    function hideLoading(index) {
        const loadingSpinner = panels[index].querySelector('.panel-spinner'); // Get the spinner specific to the panel
        console.log('Hiding loading for panel:', panels[index].id);
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none'; 
        }
    }
});
