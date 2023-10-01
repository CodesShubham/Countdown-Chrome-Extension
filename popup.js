document.getElementById('startButton').addEventListener('click', function () {
    const dateTime = document.getElementById('datetime').value;

    chrome.runtime.sendMessage({ action: "startCountdown", dateTime: dateTime });
});
