// Static song data
const songs = [
    { title: "court", movie: "court", artist: "Telvadh" },
    { title: "Butta Bomma", movie: "Ala Vaikunthapurramuloo", artist: "Armaan Malik" },
    { title: "pushpa", movie: "Pushpa: The Rise", artist: "Sid Sriram" },
    { title: "Ramuloo Ramulaa", movie: "Ala Vaikunthapurramuloo", artist: "Anurag Kulkarni, Mangli" },
    { title: "Oo Antava Oo Oo Antava", movie: "Pushpa: The Rise", artist: "Indravathi Chauhan" },
    { title: "Inkem Inkem Inkem Kaavaale", movie: "Geetha Govindam", artist: "Sid Sriram" },
    { title: "Jai Balayya", movie: "Akhanda", artist: "Geetha Madhuri" },
    { title: "Pakka Local", movie: "Janatha Garage", artist: "Geetha Madhuri, Sagar" },
    { title: "Vachindamma", movie: "Geetha Govindam", artist: "Sid Sriram" },
    { title: "Nuvvu Nenu Kalisunte", movie: "Gang", artist: "Anurag Kulkarni" },
    { title: "Pushpa 2", movie: "Pushpa 2", artist:"Telvadh"}
];

let selectedSong = "";

function showSuggestions(value) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';

    if (value.trim().length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(value.toLowerCase()) ||
        song.movie.toLowerCase().includes(value.toLowerCase())
    );

    filteredSongs.forEach(song => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = `${song.title} - ${song.movie}`;

        item.onclick = () => {
            selectedSong = song.title;
            document.getElementById('songSearch').value = song.title;
            suggestionsBox.style.display = 'none';
        };

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = filteredSongs.length > 0 ? 'block' : 'none';
}

document.querySelector('.submit-button').onclick = function () {
    const inputVal = document.getElementById('songSearch').value.trim();
    if (inputVal.length > 0) {
        // Check if song exists in static list
        const song = songs.find(s => s.title.toLowerCase() === inputVal.toLowerCase());
        if (song) {
            const songSlug = song.title.replace(/\s+/g, '_');
            const songUrl = `songs/${songSlug}/${songSlug}.html`;
            // Check if the song HTML file exists
            fetch(songUrl, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = songUrl;
                    } else {
                        alert("Song page not found. Please try another song.");
                    }
                })
                .catch(() => {
                    alert("Error accessing song page. Please try again.");
                });
        } else {
            alert("Song not found. Please try another song.");
        }
    } else {
        alert("Please enter a song name.");
    }
};

document.addEventListener('click', function (event) {
    const input = document.getElementById('songSearch');
    const suggestionsBox = document.getElementById('suggestions');
    if (!input.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});