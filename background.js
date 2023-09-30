// This is the background script for the extension
// It listens for messages from the popup script and sets the badge text accordingly
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // message is an object with a property called time, which is the countdown time in seconds
    // sender is an object with a property called tab, which is the current tab
    // sendResponse is a function that can be used to send a response back to the popup script
    if (message.time) {
      // Set the badge text to the countdown time
      chrome.browserAction.setBadgeText({text: message.time.toString(), tabId: sender.tab.id});
      // Set the badge background color to green
      chrome.browserAction.setBadgeBackgroundColor({color: "green", tabId: sender.tab.id});
    } else {
      // Clear the badge text and color
      chrome.browserAction.setBadgeText({text: "", tabId: sender.tab.id});
      chrome.browserAction.setBadgeBackgroundColor({color: "", tabId: sender.tab.id});
    }
  });
  