let countdownInterval;

function startCountdown(targetDateTime) {
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
            chrome.action.setBadgeText({ text: countdownText });
        }
    }, 1000);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startCountdown") {
        const targetDateTime = new Date(request.dateTime);
        startCountdown(targetDateTime);
    }
});
