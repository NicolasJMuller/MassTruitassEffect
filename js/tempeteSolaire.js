// true = activé l'effet tempete solaire / false = désactivé l'effet tempete solaire
const modeDegradé = false;

if (modeDegradé) {
    // Ajoute la classe sur le body
    document.body.classList.add('mode-degrade');

    // Injecte le bandeau en haut de page
    const bandeau = document.createElement('div');
    bandeau.classList.add('bandeau-alerte');
    bandeau.textContent = 'ALERTE !!! Tempête solaire détectée. Communications dégradées. Signal instable !!!';
    document.body.prepend(bandeau);

    // Décale le contenu pour ne pas être caché par le bandeau
    document.body.style.paddingTop = '40px';
}