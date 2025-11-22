// Fonction pour charger un fichier HTML dans un élément
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Erreur lors du chargement de', filePath, error));
}

window.addEventListener('DOMContentLoaded', () => {
    loadComponent('html/header.html', 'header');
    loadComponent('html/home.html', 'home');
    loadComponent('html/about.html', 'about');
    loadComponent('html/projets.html', 'projects');
    loadComponent('html/contact.html', 'contact');
    loadComponent('html/footer.html', 'footer');
});

