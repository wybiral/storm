const budio = {

    /*
    Return WebAudio source node from array.
    */
    getNode: (ctx, a) => {
        const length = a.length;
        const rate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, length, rate);
        const data = buffer.getChannelData(0);
        data.set(a);
        const node = ctx.createBufferSource();
        node.buffer = buffer;
        return node;
    },

    /*
    Add b to a.
    */
    add: (a, b) => {
        const length = Math.min(a.length, b.length);
        for (let i = 0; i < length; i++) {
            a[i] += b[i];
        }
    },

    /*
    Multiply a by scalar x.
    */
    mul: (a, x) => {
        const length = a.length;
        for (let i = 0; i < length; i++) {
            a[i] *= x;
        }
    },

    /*
    Smooth a (crude low-pass filter).
    */
    smooth: a => {
        const length = a.length - 1;
        for (let i = 1; i < length; i++) {
            a[i] += a[i - 1] + a[i + 1];
            a[i] /= 3;
        }
    },

    /*
    Fade out a using curve of power.
    */
    fadeOut: (a, power) => {
        const length = a.length;
        for (let i = 0; i < length; i++) {
            a[i] *= Math.pow(1 - i / length, power);
        }
    },

    /*
    Generate brownian noise of tone (0=rumbly, 1=crispy).
    */
    noise: (length, tone) => {
        const a = 1 - tone;
        const b = tone;
        let last = 0.0;
        const noise = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            last = a * last + b * (Math.random() * 2 - 1);
            noise[i] = last;
        }
        return noise;
    },

    /*
    Generate silence (empty array).
    */
    silence: length => new Float32Array(length)
};
