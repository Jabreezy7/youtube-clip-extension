
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "clip") {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const currentTime = Math.floor(videoElement.currentTime);
            const clipStartTime = Math.max(0, currentTime - 30);

            // Get the video URL and extract the video ID
            const videoUrl = window.location.href;
            const videoId = videoUrl.split('v=')[1].split('&')[0]; // Extract video ID

            // Construct the clipped embed URL
            const clippedUrl = `https://www.youtube.com/embed/${videoId}?start=${clipStartTime}&end=${currentTime}&autoplay=true`;

            // Send the response back to popup.js
            chrome.runtime.sendMessage({status: "success", clipUrl: clippedUrl});
        } else {
            chrome.runtime.sendMessage({status: "error"});
        }
    }
});


