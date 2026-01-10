let music = [];

async function loadMusic() {
    const manifestRes = await fetch('music/manifest.json');
    const manifest = await manifestRes.json();

    music = await Promise.all(
        manifest.songs.map(async (file) => {
            const res = await fetch(`music/${file}`);
            return await res.json();
        })
    );

    // populate the music list UI
    let list = document.getElementById('music-list');
    music.forEach((m, i) => {
        let element = document.createElement('div');
        element.classList.add('music');
        element.innerText = m['header']['name'];
        element.onclick = () => {
            let ch = list.children;
            for (let j = 0; j < ch.length; j++) {
                ch[j].classList.remove('active');
            }
            element.classList.add('active');
            load_track(music[i]);
            run_all();
        };
        list.append(element);
    });
}

// call it on load
window.addEventListener('load', loadMusic);
