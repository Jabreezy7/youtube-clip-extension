chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "clip") {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const currentTime = Math.floor(videoElement.currentTime);
            const clipStartTime = Math.max(0, currentTime - 30);

            // Get the video URL and construct the clipped URL
            const videoUrl = window.location.href;
            const clippedUrl = `${videoUrl}&start=${clipStartTime}&end=${currentTime}`;

            // Send the response back to popup.js
            chrome.runtime.sendMessage({status: "success", clipUrl: clippedUrl});
        } else {
            chrome.runtime.sendMessage({status: "error"});
        }
    }
});
