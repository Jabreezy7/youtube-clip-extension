// Import the function to get the active tab URL
import { getActiveTabURL } from "./utils.js";

// Check if the user is on a YouTube video URL
document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    // Get the video ID from the query parameters
    const currentVideo = urlParameters.get("v");
    
    // Check if the URL is a YouTube video link
    if (!activeTab.url.includes("youtube.com/watch") || !currentVideo) {
        // Hide the clip button if not a YouTube video and 
        // show a message to the user indicating that the page is not a YouTube video
        const clipButton = document.getElementById('clip-button');
        clipButton.style.display = 'none';

        const message = document.getElementById('message');
        message.style.display = 'block';
        message.innerHTML = "This is not a Youtube Video";
    }
});

// Event listener for the clip button
document.getElementById('clip-button').addEventListener('click', async () => {
    // Clear the header and button
    const header = document.querySelector('h2');
    const clipButton = document.getElementById('clip-button');
    const body = document.body;

    header.innerHTML = '';
    clipButton.style.display = 'none';
    
    // Adjust the body dimensions
    body.style.width = '300px';
    body.style.height = '50px';

    // Send a message to the content script to create a clip
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tabs[0].id, { action: "clip" });
});

// Listen for a response message from the background script
chrome.runtime.onMessage.addListener((request) => {
    const buttonContainer = document.getElementById('button-container');
    const linkButton = document.getElementById('clip-link');
    const copyButton = document.getElementById('copy-button');

    // Check if the request status indicates success
    if (request.status === "success") {
        // Set the URL as a data attribute on the link button
        linkButton.dataset.url = request.clipUrl;
        buttonContainer.style.display = "flex";

        // Set up the link button functionality
        linkButton.addEventListener('click', () => {
            // Open the clip URL in a new tab
            window.open(linkButton.dataset.url, '_blank');
        });

        // Set up the copy button functionality
        copyButton.addEventListener('click', () => {
            // Copy the clip URL to the clipboard
            navigator.clipboard.writeText(request.clipUrl)
                .then(() => {
                    // Add a class to indicate the button was pressed
                    copyButton.classList.add('green-button');
                })
        });
    } else {
        // Hide the button container if there was an error
        buttonContainer.style.display = "none";
        const messageElement = document.createElement('div');
        messageElement.innerText = "Error: Could not create the clip.";
        document.body.appendChild(messageElement);
    }
});

