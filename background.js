// background.js

let countdownInterval;
let targetDateTime;

// Function to send a message to the popup to update the countdown display
function updatePopupCountdown(countdownText) {
    chrome.runtime.sendMessage({ action: "updateCountdown", countdownText: countdownText });
}

function startCountdown() {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
        const currentDate = new Date();
        const timeDifference = targetDateTime - currentDate;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            chrome.action.setBadgeText({ text: "Expired" });
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            updatePopupCountdown(countdownText); // Send the countdown text to the popup
        }
    }, 1000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startCountdown") {
        targetDateTime = new Date(request.dateTime);
        startCountdown();
    } else if (request.action === "getCountdown") {
        const currentDate = new Date();
        const timeDifference = targetDateTime - currentDate;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            sendResponse({ countdownText: countdownText });
        } else {
            sendResponse({ countdownText: "Countdown expired!" });
        }
    }
});

// Initialize the extension
chrome.runtime.onInstalled.addListener(function () {
    chrome.action.setBadgeText({ text: "" });
});
