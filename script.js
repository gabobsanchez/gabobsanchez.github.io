document.addEventListener('DOMContentLoaded', function () {
    // Elementos principales
    const consentCard = document.getElementById('consentCard');
    const acceptButton = document.getElementById('acceptAudio');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const menu = document.getElementById('menu');
    const topRightButton = document.querySelector('.button-top-right');
    const homeButton = document.getElementById('home-button');
    const storiesButton = document.getElementById('stories-button');
    
    // Elementos para animación y video
    const circleOverlay = document.getElementById('circle-overlay');
    const videoContainer = document.getElementById('video-container');
    const fullscreenVideo = document.getElementById('fullscreen-video');
    
    // Elementos para Dinámica de Hoy
    const dynamicButton = document.querySelector('.dynamic-button');
    const dynamicCard = document.getElementById('dynamicCard');
    const submitStoryBtn = document.getElementById('submitStory');
    const storyInput = document.getElementById('storyInput');
    
    // Elementos para Historias
    const storiesPanel = document.getElementById('stories-panel');
    const storiesContainer = document.getElementById('stories-container');
    const closeStoriesBtn = document.getElementById('close-stories');
    const bottomButtons = document.querySelector('.bottom-buttons');

    // Almacenamiento de datos
    let stories = [];
    let userSubmissions = {};

    // Cargar datos al iniciar
    loadStoredData();

    // Event listeners
    setupEventListeners();

    // Funciones principales
    function loadStoredData() {
        try {
            stories = JSON.parse(localStorage.getItem('stories')) || [];
            userSubmissions = JSON.parse(localStorage.getItem('userSubmissions')) || {};
        } catch (e) {
            console.error("Error cargando datos:", e);
            stories = [];
            userSubmissions = {};
        }
    }

    function setupEventListeners() {
        // Consentimiento
        if (acceptButton) {
            acceptButton.addEventListener('click', handleConsent);
        }

        // ANIVERSARIO
        const anniversaryButton = document.querySelector('.large-button:not(.dynamic-button)');
        if (anniversaryButton) {
            anniversaryButton.addEventListener('click', handleAnniversary);
        }

        // DINÁMICA DE HOY
        if (dynamicButton) {
            dynamicButton.addEventListener('click', handleDynamic);
        }

        // HOME
        if (homeButton) {
            homeButton.addEventListener('click', resetToInitialState);
        }

        // HISTORIAS
        if (storiesButton) {
            storiesButton.addEventListener('click', toggleStoriesPanel);
        }

        // CERRAR HISTORIAS
        if (closeStoriesBtn) {
            closeStoriesBtn.addEventListener('click', hideStoriesPanel);
        }

        // ENVIAR HISTORIA
        if (submitStoryBtn) {
            submitStoryBtn.addEventListener('click', submitStory);
        }

        // Clicks fuera de los elementos
        document.addEventListener('click', handleOutsideClicks);
    }

    function handleConsent() {
        localStorage.setItem('audioConsent', 'true');
        consentCard.classList.add('brutalist-card--fade-out');

        setTimeout(() => {
            backgroundAudio.play().catch(e => console.log("Error de audio:", e));
        }, 500);

        setTimeout(() => {
            consentCard.style.display = 'none';
            showAllElements();
        }, 1000);
    }

    function handleAnniversary(e) {
        e.preventDefault();
        hideAllElements();
        startCircleAnimation();
        fadeOutAudio(backgroundAudio, 1500);
    }

    function handleDynamic(e) {
        e.preventDefault();
        hideAllElements();
        showDynamicCard();
        showBottomButtons();
    }

    function handleOutsideClicks(e) {
        // Cerrar dinámica
        if (dynamicCard && dynamicCard.style.display === 'block') {
            if (!dynamicCard.contains(e.target) && e.target !== dynamicButton) {
                resetToInitialState();
            }
        }
        
        // Cerrar historias
        if (storiesPanel && storiesPanel.style.display === 'flex') {
            if (!storiesPanel.contains(e.target) && e.target !== storiesButton) {
                hideStoriesPanel();
            }
        }
    }

    // Funciones de visualización
    function showAllElements() {
        if (menu) {
            menu.style.display = 'flex';
            // Animaciones para los botones del menú (derecha a izquierda)
            const menuButtons = menu.querySelectorAll('.button');
            menuButtons.forEach((button, index) => {
                button.style.opacity = '0';
                button.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    button.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease';
                    button.style.transform = 'translateX(0)';
                    button.style.opacity = '1';
                }, 100 + (index * 150));
            });
        }
        
        if (topRightButton) {
            topRightButton.style.display = 'flex';
            // Animaciones para los botones superiores (derecha a izquierda)
            const topButtons = topRightButton.querySelectorAll('.large-button');
            topButtons.forEach((button, index) => {
                button.style.opacity = '0';
                button.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    button.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease';
                    button.style.transform = 'translateX(0)';
                    button.style.opacity = '1';
                }, 100 + (index * 150));
            });
        }
        
        hideBottomButtons();
    }

    function hideAllElements() {
        if (menu) {
            const menuButtons = menu.querySelectorAll('.button');
            menuButtons.forEach(button => {
                button.style.transition = 'none';
                button.style.opacity = '0';
                button.style.transform = 'translateX(100px)';
            });
            menu.style.display = 'none';
        }
        
        if (topRightButton) {
            const topButtons = topRightButton.querySelectorAll('.large-button');
            topButtons.forEach(button => {
                button.style.transition = 'none';
                button.style.opacity = '0';
                button.style.transform = 'translateX(100px)';
            });
            topRightButton.style.display = 'none';
        }
    }

    function showBottomButtons() {
        if (bottomButtons) {
            bottomButtons.style.display = 'flex';
            if (homeButton) {
                homeButton.style.display = 'flex';
                homeButton.style.opacity = '0';
                homeButton.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    homeButton.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease';
                    homeButton.style.transform = 'translateX(0)';
                    homeButton.style.opacity = '1';
                }, 100);
            }
            if (storiesButton) {
                storiesButton.style.display = 'flex';
                storiesButton.style.opacity = '0';
                storiesButton.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    storiesButton.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease';
                    storiesButton.style.transform = 'translateX(0)';
                    storiesButton.style.opacity = '1';
                }, 250);
            }
        }
    }

    function hideBottomButtons() {
        if (bottomButtons) bottomButtons.style.display = 'none';
        hideStoriesPanel();
    }

    function showDynamicCard() {
        if (dynamicCard) {
            dynamicCard.style.display = 'block';
            dynamicCard.style.opacity = '0';
            dynamicCard.style.top = '50%';
            dynamicCard.style.left = '50%';
            dynamicCard.style.transform = 'translate(-50%, -50%)';
            
            setTimeout(() => {
                dynamicCard.style.opacity = '1';
            }, 10);
        }
    }

    // Funciones de historias
    function toggleStoriesPanel() {
        if (storiesPanel.style.display === 'flex') {
            hideStoriesPanel();
        } else {
            showStoriesPanel();
        }
    }

    function showStoriesPanel() {
        // Recargar historias por si hay nuevas
        loadStoredData();
        
        // Limpiar contenedor
        storiesContainer.innerHTML = '';
        
        // Filtrar historias válidas
        const validStories = stories.filter(story => 
            story && story.text && story.text.trim() !== ''
        );
        
        if (validStories.length === 0) {
            storiesContainer.innerHTML = '<p>No hay historias compartidas todavía.</p>';
        } else {
            validStories.forEach(story => {
                const storyElement = document.createElement('div');
                storyElement.className = 'story-item';
                
                // Formatear fecha
                const date = story.timestamp ? new Date(story.timestamp) : new Date();
                const dateString = date.toLocaleDateString() + ' ' + 
                                date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                storyElement.innerHTML = `
                    <div class="story-date">${dateString}</div>
                    <div class="story-text">${story.text}</div>
                `;
                storiesContainer.appendChild(storyElement);
            });
        }
        
        storiesPanel.style.display = 'flex';
        storiesPanel.style.opacity = '0';
        setTimeout(() => {
            storiesPanel.style.opacity = '1';
        }, 10);
    }

    function hideStoriesPanel() {
        if (storiesPanel) storiesPanel.style.display = 'none';
    }

    function submitStory() {
        if (!storyInput) return;
        
        const userId = localStorage.getItem('userId') || generateUserId();
        localStorage.setItem('userId', userId);
        
        // Verificar límite de envíos
        const submissionsCount = userSubmissions[userId] || 0;
        if (submissionsCount >= 2) {
            alert("Ya has enviado el máximo de 2 historias. ¡Gracias por participar!");
            return;
        }
        
        const storyText = storyInput.value.trim();
        if (storyText === '') {
            alert("Por favor escribe tu historia antes de enviar.");
            return;
        }
        
        // Crear nueva historia
        const newStory = {
            text: storyText,
            timestamp: new Date().toISOString(),
            userId: userId
        };
        
        // Actualizar y guardar datos
        stories.unshift(newStory);
        userSubmissions[userId] = submissionsCount + 1;
        
        localStorage.setItem('stories', JSON.stringify(stories));
        localStorage.setItem('userSubmissions', JSON.stringify(userSubmissions));
        
        // Feedback al usuario
        alert(`¡Gracias por compartir! (Envíos restantes: ${2 - (submissionsCount + 1)})`);
        storyInput.value = '';
        
        // Actualizar panel si está visible
        if (storiesPanel.style.display === 'flex') {
            showStoriesPanel();
        }
    }

    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Funciones de estado
    function resetToInitialState() {
        // Ocultar elementos especiales
        if (dynamicCard) dynamicCard.style.display = 'none';
        if (videoContainer) videoContainer.style.display = 'none';
        if (circleOverlay) {
            circleOverlay.style.width = '0';
            circleOverlay.style.height = '0';
            circleOverlay.style.opacity = '0';
        }
        
        // Restaurar audio
        if (backgroundAudio) {
            backgroundAudio.volume = 1;
        }
        
        // Limpiar inputs
        if (storyInput) storyInput.value = '';
        
        // Ocultar paneles
        hideStoriesPanel();
        hideBottomButtons();
        
        // Mostrar elementos principales
        showAllElements();
    }

    // Funciones de animación
    function startCircleAnimation() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const finalSize = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
        
        circleOverlay.style.opacity = '1';
        circleOverlay.style.width = finalSize + 'px';
        circleOverlay.style.height = finalSize + 'px';
        
        setTimeout(() => {
            playFullscreenVideo();
        }, 1500);
    }

    function fadeOutAudio(audioElement, duration) {
        const initialVolume = audioElement.volume;
        const stepTime = 50;
        const steps = duration / stepTime;
        const volumeStep = initialVolume / steps;
        
        const fadeInterval = setInterval(() => {
            if (audioElement.volume > volumeStep) {
                audioElement.volume -= volumeStep;
            } else {
                audioElement.volume = 0;
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }

    function playFullscreenVideo() {
        if (!fullscreenVideo || !videoContainer) return;
        
        fullscreenVideo.src = 'aniversario.mp4';
        videoContainer.style.display = 'block';
        
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen().catch(e => console.log("Error en pantalla completa:", e));
        }
        
        fullscreenVideo.play().catch(e => console.log("Error al reproducir video:", e));
        
        fullscreenVideo.onended = function() {
            resetToInitialState();
        };
    }
});