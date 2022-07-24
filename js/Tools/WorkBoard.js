import utils from "../utils";

class Retangle {

    constructor({ globalstore, id, type }) {

        this.globalstore = globalstore;
        this.id = id || utils.getUniqueId()
        this.x = 250
        this.y = 10
        this.type = type || 'desktop'

        this.width = 500
        this.height = 500

        this.color = '#fff'

        this.draw = this.draw.bind(this)
    }

    draw() {
        this.globalstore.ctx.fillStyle = this.color
        this.globalstore.ctx.fillRect(this.x, this.y, this.width, this.height)
    }


}

export default Retangle; 