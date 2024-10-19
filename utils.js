// Export an asynchronous function to get the URL of the active tab
export async function getActiveTabURL() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
