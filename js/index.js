

/*
 *Selecting elements from the DOM
 *and declaring variables
 */
 var hour = document.querySelector("#hour");
 var minutes = document.querySelector("#minutes");
 var seconds = document.querySelector("#seconds");
 var countdownButton = document.querySelector("#set");
 var cancelButton = document.querySelector("#dismiss");
 cancelButton.style.display = "none";
 var clearCountdown;
 
 var message = document.querySelector("#message");
 
 message.innerHTML = `
 <p class="alert alert-info">
  Set Time to Get Started
 </p>
`;

 /*
 *Adding Event Listeners
 *and firing events
 */
 countdownButton.addEventListener("click", startCountdown);
 cancelButton.addEventListener("click", cancelCountdown);
 
 function startCountdown() {
   
 /*
  *Checking the values
  *of the inputs
  */
  if (minutes.value > 59 || minutes.value < 0 || seconds.value > 59 || seconds.value < 0 || hour.value > 23 || hour.value < 0) {
    
    message.innerHTML = `
    <p class="alert alert-danger">
      Countdown Cannot Be Set
    </p>
    `;
    
    return;
  }
  
  if(hour.value == 0 && minutes.value == 0 && seconds.value == 0) {
    
    message.innerHTML = `
    <p class="alert alert-warning">
      Input Cannot Be Empty
    </p>
    `;
    
    return;
  }
  /*
   *Avoid input once
   *countdown starts
   */
   hour.setAttribute("disabled", "disabled");
   minutes.setAttribute("disabled", "disabled");
   seconds.setAttribute("disabled", "disabled");
   
   /*
    *Countdown every second
    */
    clearCountdown = setInterval(decreaseTime, 1000);
    
    //Hide Start button
    countdownButton.style.display = "none";
    //Show end button
    cancelButton.style.display = "";
 }
 
 function twoDigits(z) {
 /*
  *Adding 0 if number is less than 10
  */
  if (z < 10 && z.length < 2) {
    z = "0" + z;
  }
  return z;
 }
 
 function decreaseTime() {
   
    message.innerHTML = `
    <p class="alert alert-primary">
      Countdown in Progress...
    </p>
    `;
   
   //decrement value of seconds every second
   seconds.value--;
   seconds.value = twoDigits(seconds.value);
   
   //Conditionals for decrementing minutes and hour
   if (seconds.value < 1 && minutes.value > 0) {
     minutes.value--;
     seconds.value = 59;
     minutes.value = twoDigits(minutes.value);
     seconds.value = twoDigits(seconds.value);
   }
   if (minutes.value < 1 && hour.value > 0) {
     hour.value--;
     minutes.value = 59;
     seconds.value = 59;
     minutes.value = twoDigits(minutes.value);
     seconds.value = twoDigits(seconds.value);
     hour.value = twoDigits(hour.value);
   }
   if (seconds.value > 0 && hour.value > 0 && minutes.value === 0) {
     seconds.value--;
     minutes.value = 59;
     hour.value--;
     minutes.value = twoDigits(minutes.value);
     seconds.value = twoDigits(seconds.value);
     hour.value = twoDigits(hour.value);
   }
   
   //Also run this function every second
   checkTimer();
 }
 
 function checkTimer() {
   
   //Once countdown finishes
   
   if (hour.value < 1 && minutes.value < 1 && seconds.value < 1) {
     timerFinished();
   }
 }
 
 function timerFinished() {
   
    message.innerHTML = `
    <p class="alert alert-success">
      Countdown Finished
    </p>
    `;
   
   hour.value = "00";
   minutes.value = "00";
   seconds.value = "00";

   //Stop the countdown
   clearInterval(clearCountdown);

   //remove the disabled attribute
   hour.removeAttribute("disabled");
   minutes.removeAttribute("disabled");
   seconds.removeAttribute("disabled");
   
   //Hide Cance cancel 
   cancelButton.style.display = "none";
   
   //Show start button
   countdownButton.style.display = "";
   
 }
 
 /*
  *<(°¿°)>
  *<(°¿°)>
  *<(°¿°)>
  */
  
  function cancelCountdown() {
    
    message.innerHTML = `
    <p class="alert alert-danger">
      Countdown Cancelled
    </p>
    `;
    
    clearInterval(clearCountdown);
    
    hour.removeAttribute("disabled");
    minutes.removeAttribute("disabled");
    seconds.removeAttribute("disabled");
    
    cancelButton.style.display = "none";

    restoreDefault();
  }
  
  function restoreDefault() {
    hour.value = "00";
    minutes.value = "00";
    seconds.value = "00";
    
    countdownButton.style.display = "";
  }


