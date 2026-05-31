fetch('crise.json')
    .then(r => r.json())
    .then(data => {
        const dementiContainer = document.getElementById('dementi-container');
        const preuvesContainer = document.getElementById('preuves-container');

        // Démentis
        data.dementi.forEach(d => {
            const carte = document.createElement('div');
            carte.classList.add('dementi-carte');
            carte.innerHTML = `
                <h3>${d.titre}</h3>
                <p>${d.description}</p>
                <span class="horodatage">${d.horodatage}</span>
            `;
            dementiContainer.appendChild(carte);

            // Preuves liées à ce démenti
            const preuves = data.preuves.filter(p => p.dementi_id === d.id);
            preuves.forEach(p => {
                const preuve = document.createElement('div');
                preuve.classList.add('preuve-carte');
                preuve.innerHTML = `
                    <div class="preuve-info">
                        <h3>${p.titre}</h3>
                        <p>${p.description}</p>
                        <span class="horodatage">${p.horodatage}</span>
                    </div>
                    <a href="${p.lien}" class="preuve-lien">Consulter</a>
                `;
                preuvesContainer.appendChild(preuve);
            });
        });
    });