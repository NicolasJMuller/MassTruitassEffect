fetch('timeline.json')
    .then(r => r.json())
    .then(data => {
        const pointsContainer = document.getElementById('timeline-points');
        const contenu = document.getElementById('timeline-contenu');

        data.evenements.forEach((evt, index) => {
            const point = document.createElement('div');
            point.classList.add('timeline-point');
            point.innerHTML = `
                <div class="timeline-point-cercle"></div>
                <span class="timeline-point-date">${evt.date}</span>
            `;

            point.addEventListener('click', () => {
                // Retirer actif de tous les points
                document.querySelectorAll('.timeline-point').forEach(p => p.classList.remove('actif'));
                point.classList.add('actif');

                // Mettre à jour le contenu
                contenu.innerHTML = `
                    <span class="timeline-contenu-date">${evt.date}</span>
                    <h3>${evt.titre}</h3>
                    <h4>${evt.soustitre}</h4>
                    ${evt.image ? `<img src="${evt.image}" alt="${evt.titre}">` : ''}
                    <div class="timeline-texte">${evt.texte}</div>
                `;
            });

            pointsContainer.appendChild(point);
        });
    });