
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(() => {
                console.log('Registration successful');
            })
            .catch(() => {
                console.log('Registration failed')
            });
    }
}

window.addEventListener('load', registerServiceWorker);


// jakies dzialanie widoczne na UI
const image = document.querySelector('.mozilla-image');

setInterval(() => {
    image.style.opacity = image.style.opacity === '1' ? '0' : '1';
}, 1000);

// zadanie domowe -- wydzielic mniejsze funkcje dla lepszej czytelnosci
window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();

    deferredPrompt = event;

    const button = document.querySelector('.install-button');

    button.addEventListener('click', () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt')
            } else {
                console.log('User dismissed the A2HS prompt')
            }

            deferredPrompt = null;
        });
    })
});
