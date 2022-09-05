export class LeftBar {
    constructor(canvas, analyser, width, height) {
        this.canvas = canvas,
        this.analyser = analyser,
        this.width = width,
        this.height = height
    }
    setup() {
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        this.barWidth = this.width / bufferLength;
    }
    update(width, height) {
        this.width = width;
        this.height = height;
    }
    draw() {
        this.setup();
        this.dataArraydataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect(x, this.height - y, this.barWidth, y);
        });
    }
    knife() {
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect(x, this.height / 2 - y, this.barWidth, 5);
        });
    }
    dotted() {
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect(x, this.height / 2 - y, this.barWidth - (this.barWidth / 2), 5);
        });
    }
}

export class MiddleBar {
    constructor(canvas, analyser, width, height) {
        this.canvas = canvas,
        this.analyser = analyser,
        this.width = width,
        this.height = height
    }
    setup() {
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        this.barWidth = this.width / bufferLength;
    }
    update(width, height) {
        this.width = width;
        this.height = height;
    }
    draw() {
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect((this.width / 2) - (x / 2), this.height - y, this.barWidth, y);
            this.canvas.fillRect((this.width / 2) + (x / 2), this.height - y, this.barWidth, y);
        });
    }
    knife() {
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect((this.width / 2) - x, this.height / 2 - y, this.barWidth, 5);
            this.canvas.fillRect((this.width / 2) + x, this.height / 2 - y, this.barWidth, 5);
        });
    }
    dotted() {
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(${index * (this.width * 0.002)}, 100%, 50%)`;
            this.canvas.fillRect((this.width / 2) - x, this.height / 2 - y, this.barWidth - (this.barWidth / 2), 5);
            this.canvas.fillRect((this.width / 2) + x, this.height / 2 - y, this.barWidth - (this.barWidth / 2), 5);
        });
    }
}

export class Bar {
    constructor(canvas, analyser, width, height) {
        this.canvas = canvas,
        this.analyser = analyser,
        this.width = width,
        this.height = height
    }
    setup() {
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        this.barWidth = this.width / bufferLength;
    }
    update(width, height) {
        this.width = width;
        this.height = height;
    }
    draw(){
        this.setup();
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;

            this.canvas.fillStyle = `hsl(271, 95%, ${50 - index/2}%)`;
            this.canvas.fillRect((this.width / 2) - (x / 2), (this.height / 2 - y) + 1, this.barWidth, y);
            this.canvas.fillRect((this.width / 2) + (x / 2), (this.height / 2 - y) + 1, this.barWidth, y);

            this.canvas.fillRect((this.width / 2) - (x / 2), (this.height / 2 + y) - 1, this.barWidth, -y);
            this.canvas.fillRect((this.width / 2) + (x / 2), (this.height / 2 + y) - 1, this.barWidth, -y);
            
        });
    }
}