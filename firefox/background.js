/*-
 * Fahhh Extension - Background Script
 * Listens for 404s and network errors.
 */

let lastPlayed = 0;
const COOLDOWN = 2000; // 2 seconds debounce

function playFahhh() {
    const now = Date.now();
    if (now - lastPlayed < COOLDOWN) return;
    lastPlayed = now;

    console.log("Fahhh triggered in background!");

    // Directly play audio in the background context
    const audio = new Audio(browser.runtime.getURL("assets/fahhh.mp3"));
    audio.play().catch(err => {
        console.error("Failed to play audio in background:", err);
    });
}

// Detect Network Errors (DNS, Connection Refused, etc.)
browser.webNavigation.onErrorOccurred.addListener((details) => {
    if (details.frameId === 0) {
        playFahhh();
    }
});

// Detect 404 Not Found Errors
browser.webRequest.onHeadersReceived.addListener(
    (details) => {
        if (details.frameId === 0 && details.statusCode === 404) {
            playFahhh();
        }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
);
