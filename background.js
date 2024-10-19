// Listen for messages from popup.js or content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "clip") {
        console.log("Clip request received in background.js");
        
        // Get the active tab in the current window
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs.length > 0) {
                // Send a message to the content script to handle the clipping operation
                chrome.tabs.sendMessage(tabs[0].id, {action: "createClip"}, (response) => {
                    if (response && response.status === "success") {
                        console.log("Clip URL created: " + response.clipUrl);
                        // Respond to popup.js with the clip URL
                        sendResponse({status: "success", clipUrl: response.clipUrl});
                    } else {
                        console.error("Error creating clip.");
                        sendResponse({status: "error"});
                    }
                });
            } else {
                console.error("No active tab found.");
                sendResponse({status: "error"});
            }
        });
        
        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    }
});

// Listen for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("YouTube Clipper extension installed!");
});

// Listen for when Chrome starts up
chrome.runtime.onStartup.addListener(() => {
    console.log("YouTube Clipper extension started up!");
});
