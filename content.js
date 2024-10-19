// Listen for messages from the popup or background scripts
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "clip") {
        const videoElement = document.querySelector('video');

        if (videoElement) {
            const currentTime = Math.floor(videoElement.currentTime);

            // Calculate the start time for the clip (30 seconds before the current time)
            const clipStartTime = Math.max(0, currentTime - 30);

            // Get the video URL and extract the video ID
            const videoUrl = window.location.href;
            const videoId = videoUrl.split('v=')[1]?.split('&')[0];

            if (videoId) {
                const clippedUrl = `https://www.youtube.com/embed/${videoId}?start=${clipStartTime}&end=${currentTime}`;
                // Send the success response back with the clip URL
                chrome.runtime.sendMessage({ status: "success", clipUrl: clippedUrl });
            } else {
                // Send an error response if the video ID could not be extracted
                chrome.runtime.sendMessage({ status: "error" });
            }
        } else {
            // Send an error response if the video element does not exist
            chrome.runtime.sendMessage({ status: "error" });
        }
    }
});
