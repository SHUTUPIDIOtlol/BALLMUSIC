// musicLoader.js
const fs = require('fs');
const path = require('path');

// Path to the main music.json
const musicPath = path.join(__dirname, 'music.json');

// Load and parse music.json
function loadMusic() {
    if (!fs.existsSync(musicPath)) {
        console.error('music.json not found!');
        return [];
    }
    const rawData = fs.readFileSync(musicPath, 'utf8');
    try {
        const songs = JSON.parse(rawData);
        return songs;
    } catch (err) {
        console.error('Failed to parse music.json:', err);
        return [];
    }
}

// Example of playing a song
function playSong(songIndex = 0) {
    const songs = loadMusic();
    if (songs.length === 0) {
        console.log('No songs to play.');
        return;
    }

    const song = songs[songIndex];
    console.log('Playing song:', song.header.name);
    // Here you would call your ball game’s actual play function
    // e.g., musicBallGame.play(song)
}

module.exports = {
    loadMusic,
    playSong
};