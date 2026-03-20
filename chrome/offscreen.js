const player = document.getElementById('player');

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "playFahhh") {
        player.currentTime = 0;
        player.play().catch(err => {
            console.error("Failed to play audio in offscreen document:", err);
        });
    }
});

// Auto-close if no sound played for a while could be done, 
// but keeping the document open for quick subsequent replays is also fine.
