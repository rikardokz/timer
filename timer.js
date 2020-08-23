class Timer {

    // it constructs a new button
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        // it listen for when the startbutton is clicked and runs the .start method
        this.startButton.addEventListener("click", this.start);
        // it listen for when the pausebutton is clicked and runs pause()
        this.pauseButton.addEventListener("click", this.pause)
    }
    // start method calls .tick method first, and then every second.
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining)
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
    }
    // it stops the interval in start().
    pause = () => {
        clearInterval(this.interval);
    }

    onDurationChange = () => {

    }
    tick = () => {
        // checks if counter is at zero to stop it
        if (this.timeRemaining <= 0) {
            this.pause()
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            // brings the value from a getter to not duplicate code.
            // subtracts the value from time remaining for each time the tick runs
            // behind the scenes its calling the getter in the right, and setter to the left to update the value.
            this.timeRemaining = this.timeRemaining - .02;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }

    }
    // it gets the value of time remaining from the input
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }
    // it sets sets the time remaing 
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
} 