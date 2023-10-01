let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);
    const inputDateTime = new Date(document.getElementById('datetime').value);
    const currentDate = new Date();

    if (inputDateTime <= currentDate) {
        document.getElementById('countdown').innerHTML = "Invalid input. Please choose a future date and time.";
        return;
    }

    countdownInterval = setInterval(function () {
        const currentDate = new Date();
        const timeDifference = inputDateTime - currentDate;

        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "Countdown expired!";
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerHTML = `
                ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', startCountdown);
