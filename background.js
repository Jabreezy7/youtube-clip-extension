// Listen for messages from popup.js or content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "clip") {

        chrome.tabs.sendMessage(tabs[0].id, { action: "createClip" }, (response) => {
            // Check if the response indicates success
            if (response && response.status === "success") {
                // Respond to popup.js with the clip URL
                sendResponse({ status: "success", clipUrl: response.clipUrl });
            } else {
                // Respond with an error status if clipping failed
                sendResponse({ status: "error" });
            }
        });
    }
});
