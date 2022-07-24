import utils from "../utils";

class Retangle {

    constructor({ globalstore, id, x, y, width, height, color }) {

        this.globalstore = globalstore;
        this.id = id || utils.getUniqueId()
        this.x = x || 5
        this.y = y || 5
        this.width = width || 100
        this.height = height || 100
        this.color = color || utils.getRandomColor()

        this.draw = this.draw.bind(this)
    }

    draw() {
        this.globalstore.ctx.fillStyle = this.color
        this.globalstore.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}

export default Retangle; 