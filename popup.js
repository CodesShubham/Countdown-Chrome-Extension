// Get the input element for the countdown time
var input = document.getElementById("time");
// Get the button element for starting the timer
var button = document.getElementById("start");
// Get the span element for showing the remaining time
var span = document.getElementById("remaining");
// Declare a variable for storing the timer ID
var timer;

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Get the value of the input element, which is a string
  var value = input.value;
  // Parse the value as an integer, which is the countdown time in seconds
  var time = parseInt(value);
  // Check if the time is a valid number and positive
  if (isNaN(time) || time <= 0) {
    // Alert the user to enter a valid time
    alert("Please enter a positive number of seconds.");
    // Return from the function without starting the timer
    return;
  }
  // Disable the input and button elements to prevent further changes
  input.disabled = true;
  button.disabled = true;
  // Send a message to the background script with the countdown time
  chrome.runtime.sendMessage({time: time});
  // Start the timer with a one-second interval
  timer = setInterval(function() {
    // Decrease the time by one second
    time--;
    // Update the span element with the remaining time
    span.textContent = time + " seconds left";
    // Check if the time is zero or negative
    if (time <= 0) {
      // Clear the timer and reset the input and button elements
      clearInterval(timer);
      input.disabled = false;
      button.disabled = false;
      // Send a message to the background script to clear the badge text and color
      chrome.runtime.sendMessage({time: null});
      // Alert the user that the countdown is over
      alert("Time's up!");
    }
  }, 1000);
});
