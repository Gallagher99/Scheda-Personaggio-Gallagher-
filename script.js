document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { 
        const header = document.getElementById('mainHeader');
        if(header) header.classList.add('visible'); 
    }, 300);
    
    const track = document.getElementById('bg-track');
    const btn = document.getElementById('audio-btn');
    const slider = document.getElementById('seek-slider');
    const timeDisplay = document.getElementById('time-display');
    const lyricsDisplay = document.getElementById('lyrics-text');

    const canzoniere = [
        { tempo: 0, testo: "Nome traccia" },
        { tempo: 5, testo: "Il Sangue Ricorda" },
        { tempo: 9, testo: "Il Sangue Ricorda" },
        { tempo: 14, testo: "Il Sangue Ricorda" },
        { tempo: 19, testo: "Il Sangue Ricorda" },
        { tempo: 24, testo: "Il Sangue Ricorda" },
        { tempo: 27, testo: "Il Sangue Ricorda" },
        { tempo: 29, testo: "Il Sangue Ricorda" },
        { tempo: 34, testo: "Il Sangue Ricorda" },
        { tempo: 37, testo: "Il Sangue Ricorda" },
        { tempo: 40, testo: "Il Sangue Ricorda" },
        { tempo: 45, testo: "Il Sangue Ricorda" },
        { tempo: 48, testo: "Il Sangue Ricorda" },
        { tempo: 51, testo: "Il Sangue Ricorda" },
        { tempo: 53, testo: "Il Sangue Ricorda" },
        { tempo: 56, testo: "Il Sangue Ricorda" },
        { tempo: 59, testo: "Il Sangue Ricorda" },
        { tempo: 61, testo: "Il Sangue Ricorda" },
        { tempo: 64, testo: "Il Sangue Ricorda" },
        { tempo: 67, testo: "Il Sangue Ricorda" },
        { tempo: 70, testo: "Il Sangue Ricorda" },
        { tempo: 75, testo: "Il Sangue Ricorda" },
        { tempo: 81, testo: "Il Sangue Ricorda" },
        { tempo: 86, testo: "Il Sangue Ricorda" },
        { tempo: 89, testo: "Il Sangue Ricorda" },
        { tempo: 91, testo: "Il Sangue Ricorda" },
        { tempo: 96, testo: "Il Sangue Ricorda" },
        { tempo: 99, testo: "Il Sangue Ricorda" },
        { tempo: 102, testo: "Il Sangue Ricorda" },
        { tempo: 107, testo: "Il Sangue Ricorda" },
        { tempo: 110, testo: "Il Sangue Ricorda" },
        { tempo: 112, testo: "Il Sangue Ricorda" },
        { tempo: 115, testo: "Il Sangue Ricorda" },
        { tempo: 118, testo: "Il Sangue Ricorda" },
        { tempo: 121, testo: "Il Sangue Ricorda" },
        { tempo: 123, testo: "Il Sangue Ricorda" },
        { tempo: 125, testo: "Il Sangue Ricorda" },
        { tempo: 128, testo: "Il Sangue Ricorda" },
        { tempo: 133, testo: "Il Sangue Ricorda" },
        { tempo: 138, testo: "Il Sangue Ricorda" },
        { tempo: 148, testo: "Il Sangue Ricorda" },
        { tempo: 152, testo: "Il Sangue Ricorda" },
        { tempo: 154, testo: "Il Sangue Ricorda" },
        { tempo: 157, testo: "Il Sangue Ricorda" }
    ];

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    if(btn && track) {
        btn.onclick = () => {
            if (track.paused) { track.play(); btn.innerText = "𓆩ꨄ︎𓆪"; }
            else { track.pause(); btn.innerText = "🗝"; }
        };

        track.ontimeupdate = () => {
            if(slider && timeDisplay) {
                const progress = (track.currentTime / track.duration) * 100;
                slider.value = progress || 0;
                timeDisplay.innerText = `${formatTime(track.currentTime)} / ${formatTime(track.duration || 0)}`;
            }

            if(lyricsDisplay) {
                const tempoAttuale = Math.floor(track.currentTime);
                const fraseValida = [...canzoniere].reverse().find(f => f.tempo <= tempoAttuale);
                
                if (fraseValida && lyricsDisplay.innerText !== fraseValida.testo) {
                    lyricsDisplay.classList.remove('frase-animata');
                    void lyricsDisplay.offsetWidth; 
                    lyricsDisplay.innerText = fraseValida.testo;
                    lyricsDisplay.classList.add('frase-animata');
                }
            }
        };

        if(slider) {
            slider.oninput = () => {
                track.currentTime = (slider.value / 100) * track.duration;
            };
        }
    }
});

function apriContenuto(id, musica) {
    document.querySelectorAll('.sezione-dinamica').forEach(s => s.style.display = 'none');
    const target = document.getElementById(id);
    if(target) {
        target.style.display = 'block';
        let audioExtra = document.getElementById('audio-slide-extra');
        if(audioExtra && musica) {
            audioExtra.src = musica;
            audioExtra.play().catch(() => {});
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function chiudiContenuto(id) {
    const target = document.getElementById(id);
    if(target) target.style.display = 'none';
    let audioExtra = document.getElementById('audio-slide-extra');
    if(audioExtra) { audioExtra.pause(); audioExtra.currentTime = 0; }
}
