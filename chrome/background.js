/*-
 * Fahhh Extension - Chrome Background Script
 * Uses Offscreen API for background audio.
 */

let lastPlayed = 0;
const COOLDOWN = 2000; // 2 seconds debounce

async function playFahhh() {
    const now = Date.now();
    if (now - lastPlayed < COOLDOWN) return;
    lastPlayed = now;

    console.log("Fahhh triggered in background!");

    // Ensure offscreen document exists
    if (!(await chrome.offscreen.hasDocument())) {
        await chrome.offscreen.createDocument({
            url: "offscreen.html",
            reasons: ["AUDIO_PLAYBACK"],
            justification: "To play the 'Fahhhh' meme sound on error."
        });
    }

    // Send message to offscreen to play the sound
    chrome.runtime.sendMessage({ type: "playFahhh" });
}

// Detect Network Errors (DNS, Connection Refused, etc.)
chrome.webNavigation.onErrorOccurred.addListener((details) => {
    if (details.frameId === 0) {
        playFahhh();
    }
});

// Detect 404 Not Found Errors (Main frame)
chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        if (details.frameId === 0 && details.statusCode === 404) {
            playFahhh();
        }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
);
