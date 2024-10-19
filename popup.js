document.getElementById('clip-button').addEventListener('click', async () => {
    // Send a message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "clip"});
    });
});

// Listen for a response message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.status === "success") {
        document.getElementById('message').innerText = "Clip URL: " + request.clipUrl;
    } else {
        document.getElementById('message').innerText = "Error: Could not create the clip.";
    }
});

