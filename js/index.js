// Settings
const STRIKE_MIN_DELAY = 2.0;
const STRIKE_MAX_DELAY = 5.0;
const THUNDER_DELAY = 0.5;
const THUNDER_DURATION = 7;

// global variables :P
const ctx = new AudioContext();
const node = ctx.createGain();
node.connect(ctx.destination);

/*
Set background color.
*/
const background = (r, g, b) => {
    document.body.style.background = 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

/*
Play thunder at "strength" (0 to 1).
*/
const thunder = strength => {
    const rate = ctx.sampleRate;
    const length = THUNDER_DURATION * rate;
    const data = budio.silence(length);
    const noise = budio.noise(length, strength * 0.6);
    budio.smooth(noise);
    const n = 10; // Number of "octaves"
    for (let i = 0; i < n; i++) {
        budio.fadeOut(data, 1.5);
        budio.add(data, noise);
        budio.smooth(noise);
        budio.smooth(noise);
    }
    budio.fadeOut(data, 1.0);
    const source = budio.getNode(ctx, data);
    source.connect(node);
    source.start(ctx.currentTime);

}

/*
Lightning strike (loops forever [well, until it closes]).
*/
const lightning = () => {
    let delay; // Seconds until next strike
    if (Math.random() < 0.5) {
        // Chill out for a bit between clusters of strikes
        background(0, 0, 0);
        const diff = STRIKE_MAX_DELAY - STRIKE_MIN_DELAY;
        delay = Math.random() * diff + STRIKE_MIN_DELAY;
    } else {
        // Create flash and queue thunder
        const x = Math.random(); // Intensity of strike
        const c = (x * 256) | 0; // Pixel brightness
        background(c, c, c);
        delay = Math.random() * 0.1 + 0.2;
        setTimeout(() => thunder(x), THUNDER_DELAY * 1000);
    }
    setTimeout(lightning, delay * 1000);
}

window.onload = () => {
    background(0, 0, 0);
    lightning();
};
