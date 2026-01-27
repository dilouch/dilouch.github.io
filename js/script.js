// Fonction pour charger un fichier HTML dans un élément
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Si c'est le header, initialiser le bouton de langue
            if (elementId === 'header') {
                initLanguageToggle();
            }
        })
        .catch(error => console.error('Erreur lors du chargement de', filePath, error));
}

// Système de traduction
let currentLanguage = localStorage.getItem('language') || 'fr';

function initLanguageToggle() {
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
        // Mettre à jour le texte du bouton
        updateLanguageButton();
        
        // Ajouter l'événement click
        toggleBtn.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
            localStorage.setItem('language', currentLanguage);
            updateLanguageButton();
            translatePage();
        });
    }
}

function updateLanguageButton() {
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
        const langText = toggleBtn.querySelector('.lang-text');
        if (langText) {
            langText.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';
        }
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    loadComponent('html/header.html', 'header');
    loadComponent('html/home.html', 'home');
    loadComponent('html/about.html', 'about');
    loadComponent('html/projets.html', 'projects');
    loadComponent('html/contact.html', 'contact');
    loadComponent('html/footer.html', 'footer');
    
    // Attendre que tous les composants soient chargés avant de traduire
    setTimeout(() => {
        translatePage();
    }, 300);
});

