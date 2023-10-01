

document.getElementById('startButton').addEventListener('click', function () {
    const dateTime = document.getElementById('datetime').value;

    // Send a message to background.js to start the countdown
    chrome.runtime.sendMessage({ action: "startCountdown", dateTime: dateTime });
});

// Listen for messages from background.js to update the countdown display
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "updateCountdown") {
        const countdownText = request.countdownText;
        document.getElementById('countdown').textContent = countdownText;
    }
});

// Request initial countdown when popup is opened
chrome.runtime.sendMessage({ action: "getCountdown" }, function (response) {
    if (response && response.countdownText) {
        document.getElementById('countdown').textContent = response.countdownText;
    }
});
