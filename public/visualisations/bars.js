export class Bar {
    constructor(canvas, analyser, width, height) {
        this.canvas = canvas,
        this.analyser = analyser,
        this.analyser.fftSize = 512
        this.width = width,
        this.height = height
    }
    #setup() {
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
        this.#setup()
        this.dataArray.forEach((item, index) => {
            const x = this.barWidth * index;
            const y = item / 255 * this.height / 2;
            
            //this.canvas.fillStyle = `hsl(271, 95%, 50%)`;
            if(Math.abs(index % 2) === 1) {
                this.canvas.fillRect((this.width / 2) - x, (this.height / 2) - y/2, this.barWidth, y);//top left
                this.canvas.fillRect((this.width / 2) + x, (this.height / 2) - y/2, this.barWidth, y);//top right
                this.canvas.fillStyle = `hsl(271, 95%, 50%)`;
                
                
            } else if(index % 2 === 0){
                this.canvas.fillRect((this.width / 2) + x, (this.height / 2) + y/2, this.barWidth, -y);//bottom right
                this.canvas.fillRect((this.width / 2) - x, (this.height / 2) + y/2, this.barWidth, -y);//bottom left
                this.canvas.fillStyle = `hsl(271, 95%, 25%)`;
            }

            
        });
    }
}