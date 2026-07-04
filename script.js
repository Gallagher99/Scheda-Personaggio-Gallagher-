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
        { tempo: 5, testo: "Bound by Silver Threads" },
        { tempo: 9, testo: "Bound by Silver Threads" },
        { tempo: 14, testo: "Bound by Silver Threads" },
        { tempo: 19, testo: "Bound by Silver Threads" },
        { tempo: 24, testo: "Bound by Silver Threads" },
        { tempo: 27, testo: "Bound by Silver Threads" },
        { tempo: 29, testo: "Bound by Silver Threads" },
        { tempo: 34, testo: "Bound by Silver Threads" },
        { tempo: 37, testo: "Bound by Silver Threads" },
        { tempo: 40, testo: "Bound by Silver Threads" },
        { tempo: 45, testo: "Bound by Silver Threads" },
        { tempo: 48, testo: "Bound by Silver Threads" },
        { tempo: 51, testo: "Bound by Silver Threads" },
        { tempo: 53, testo: "Bound by Silver Threads" },
        { tempo: 56, testo: "Bound by Silver Threads" },
        { tempo: 59, testo: "Bound by Silver Threads" },
        { tempo: 61, testo: "Bound by Silver Threads" },
        { tempo: 64, testo: "Bound by Silver Threads" },
        { tempo: 67, testo: "Bound by Silver Threads" },
        { tempo: 70, testo: "Bound by Silver Threads" },
        { tempo: 75, testo: "Bound by Silver Threads" },
        { tempo: 81, testo: "Bound by Silver Threads" },
        { tempo: 86, testo: "Bound by Silver Threads" },
        { tempo: 89, testo: "Bound by Silver Threads" },
        { tempo: 91, testo: "Bound by Silver Threads" },
        { tempo: 96, testo: "Bound by Silver Threads" },
        { tempo: 99, testo: "Bound by Silver Threads" },
        { tempo: 102, testo: "Bound by Silver Threads" },
        { tempo: 107, testo: "Bound by Silver Threads" },
        { tempo: 110, testo: "Bound by Silver Threads" },
        { tempo: 112, testo: "Bound by Silver Threads" },
        { tempo: 115, testo: "Bound by Silver Threads" },
        { tempo: 118, testo: "Bound by Silver Threads" },
        { tempo: 121, testo: "Bound by Silver Threads" },
        { tempo: 123, testo: "Bound by Silver Threads" },
        { tempo: 125, testo: "Bound by Silver Threads" },
        { tempo: 128, testo: "Bound by Silver Threads" },
        { tempo: 133, testo: "Sonoro" },
        { tempo: 138, testo: "Bound by Silver Threads" },
        { tempo: 148, testo: "Bound by Silver Threads" },
        { tempo: 152, testo: "Bound by Silver Threads" },
        { tempo: 154, testo: "Bound by Silver Threads" },
        { tempo: 157, testo: "Bound by Silver Threads" }
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
