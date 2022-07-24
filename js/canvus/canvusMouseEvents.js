import utils from "../utils"

class canvusMouseEvents {

    constructor(globalStore) {

        this.globalStore = globalStore
        this.canvas = this.globalStore.canvas
        this.ctx = this.globalStore.ctx

        this.init = this.init.bind(this)

        this.init()
    }

    handleScroll() {

        this.canvas.addEventListener('mousewheel', (e) => {
            let lastX = this.canvas.width / 2,
                lastY = this.canvas.height / 2,
                scaleFactor = 1.1,
                delta = e.wheelDelta ? e.wheelDelta / 40 : e.detail ? -e.detail : 0;

            if (!delta) return

            let zoom = (delta) => {
                let pt = this.ctx.transformedPoint(lastX, lastY);

                this.ctx.translate(pt.x, pt.y);

                let factor = Math.pow(scaleFactor, delta);

                this.ctx.scale(factor, factor);
                this.ctx.translate(-pt.x, -pt.y);



                this.globalStore.app.redraw();
            }

            zoom(delta)
        })
    }

    canvusDrag() {
        let lastX = this.canvas.width / 2,
            lastY = this.canvas.height / 2,
            dragStart,
            dragged;

        this.canvas.addEventListener('mousedown', evt => {

            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

            lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);

            dragStart = this.ctx.transformedPoint(lastX, lastY);

            dragged = false;

        }, false);

        this.canvas.addEventListener('mousemove', evt => {

            lastX = evt.offsetX || (evt.pageX - this.canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - this.canvas.offsetTop);

            dragged = true;

            if (dragStart) {
                var pt = this.ctx.transformedPoint(lastX, lastY);
                this.ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                this.globalStore.app.redraw();
            }

        }, false);

        this.canvas.addEventListener('mouseup', function (evt) {

            dragStart = null;

            // if (!dragged) zoom(evt.shiftKey ? -1 : 1);

        }, false);
    }
    init() {

        this.handleScroll()
        this.canvusDrag()
    }

}

export default canvusMouseEvents;