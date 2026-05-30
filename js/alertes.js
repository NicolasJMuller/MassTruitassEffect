fetch('alerte.json')
    .then(r => r.json())
    .then(alertes => {
        const container = document.getElementById('alertes');
        const scriptDejaCharge = {};

        alertes
            .filter(alerte => alerte.statut === 'public')
            .forEach(alerte => {
                const carte = document.createElement('div');
                carte.classList.add('alerte-carte');
                carte.innerHTML = `
                    <div class="alerte-texte">
                        <span class="alerte-date">${alerte.date} | ${alerte.heure}</span>
                        <h3>${alerte.titre}</h3>
                        <p>${alerte.description}</p>
                    </div>
                    <div class="alerte-signal">
                        <canvas id="canvas-${alerte.id}" width="300" height="150"></canvas>
                    </div>
                `;
                container.appendChild(carte);

                if (!scriptDejaCharge[alerte.canvas]) {
                    scriptDejaCharge[alerte.canvas] = new Promise((resolve) => {
                        const script = document.createElement('script');
                        script.src = `js/${alerte.canvas}`;
                        script.onload = resolve;
                        document.body.appendChild(script);
                    });
                }

                scriptDejaCharge[alerte.canvas].then(() => {
                    initCanvas(`canvas-${alerte.id}`);
                });
            });

        setTimeout(() => {
            gsap.registerPlugin(ScrollTrigger);
            const cartes = document.querySelectorAll('.alerte-carte');

            cartes.forEach((carte, index) => {
                gsap.set(carte, { zIndex: index + 1 });

                if (index > 0) {
                    gsap.fromTo(carte,
                        { y: '0%' },
                        {
                            y: '0%',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: cartes[index - 1],
                                start: 'top 20%',
                                end: 'bottom 20%',
                                scrub: true,
                                pin: cartes[index - 1],
                                pinSpacing: false,
                            }
                        }
                    );
                }
            });
        }, 500);
    });