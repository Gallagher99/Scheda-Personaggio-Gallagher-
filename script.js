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
        { tempo: 0, testo: "..." },
        { tempo: 5, testo: "Perso nella nebbia" },
        { tempo: 9, testo: "Temo che ci sia ancora un altro crollo" },
        { tempo: 14, testo: "È pericoloso perché voglio tutto" },
        { tempo: 19, testo: "E non m'importa quello che costa" },
        { tempo: 24, testo: "Non mi sarei dovuto innamorare" },
        { tempo: 27, testo: "Guarda cosa mi ha fatto diventare" },
        { tempo: 29, testo: "Ti lascio venire più vicino solo per svegliarmi da solo" },
        { tempo: 34, testo: "E so che pensi che puoi scappare" },
        { tempo: 37, testo: "Hai paura di credere che io sia quello giusto" },
        { tempo: 40, testo: "Ma non riesco a lasciarti andare" },
        { tempo: 45, testo: "Lascerei che il mondo bruciasse" },
        { tempo: 48, testo: "Lascerei che il mondo bruciasse per te" },
        { tempo: 51, testo: "È così che deve finire sempre" },
        { tempo: 53, testo: "Se non posso averti, allora nessuno può" },
        { tempo: 56, testo: "Lo lascerei bruciare" },
        { tempo: 59, testo: "Lascerei che il mondo bruciasse" },
        { tempo: 61, testo: "Solo per sentirti gridare il mio nome" },
        { tempo: 64, testo: "Guardando tutto andare in fiamme" },
        { tempo: 67, testo: "Paura nei loro occhi" },
        { tempo: 70, testo: "Cenere piove dal cielo arancio-sangue" },
        { tempo: 75, testo: "Lascio sapere a tutti che sei mia" },
        { tempo: 81, testo: "Ora è solo questione di tempo" },
        { tempo: 86, testo: "Prima di essere travolti dalla polvere" },
        { tempo: 89, testo: "Guarda cosa mi hai fatto diventare" },
        { tempo: 91, testo: "Ti lascio venire più vicino solo per svegliarmi da solo" },
        { tempo: 96, testo: "E so che pensi che puoi scappare" },
        { tempo: 99, testo: "Hai paura di credere che io sia quello giusto" },
        { tempo: 102, testo: "Ma non riesco a lasciarti andare" },
        { tempo: 107, testo: "Lascerei che il mondo bruciasse" },
        { tempo: 110, testo: "Lascerei che il mondo bruciasse per te" },
        { tempo: 112, testo: "È così che deve finire sempre" },
        { tempo: 115, testo: "Se non posso averti, allora nessuno può" },
        { tempo: 118, testo: "Lo lascerei bruciare" },
        { tempo: 121, testo: "Lascerei che il mondo bruciasse" },
        { tempo: 123, testo: "Solo per sentirti gridare il mio nome" },
        { tempo: 125, testo: "Guardando tutto andare in fiamme" },
        { tempo: 128, testo: "Lascerei bruciare tutto" },
        { tempo: 133, testo: "Oh, io brucerei questo mondo per te" },
        { tempo: 138, testo: "Oh amore, lo lascerei bruciare per te" },
        { tempo: 148, testo: "Lascerei che il mondo bruciasse" },
        { tempo: 152, testo: "Lascerei che il mondo bruciasse per te" },
        { tempo: 154, testo: "È così che deve finire sempre" },
        { tempo: 157, testo: "Se non posso averti, allora nessuno può" }
    ];

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    if(btn && track) {
        btn.onclick = () => {
            if (track.paused) { track.play(); btn.innerText = "🔇"; }
            else { track.pause(); btn.innerText = "🔊"; }
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
