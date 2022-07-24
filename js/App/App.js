import utils from "../utils";
import Store from '../Store/Store';
import UiController from "../UiControllers/UiController";
import Tools from '../Tools/Tools'
import CanvusMouseEvents from '../canvus/canvusMouseEvents'
import UserMessageUiController from '../UiControllers/UserMessageUiController'

class App {

    constructor() {

        this.globalstore = new Store()
        this.globalstore.add('app', this)

        let userMessageUiController = new UserMessageUiController(this.globalstore)
        this.globalstore.add('userMessageUiController', userMessageUiController)

        this.canvas = document.getElementById('project-canvus')
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        this.globalstore.add('canvas', this.canvas)

        this.ctx = this.canvas.getContext("2d")
        utils.trackTransforms(this.ctx)
        this.globalstore.add('ctx', this.ctx)

        this.items = []

        this.CanvusMouseEvents = new CanvusMouseEvents(this.globalstore)

        this.tools = new Tools(this.globalstore)
        this.globalstore.add('tools', this.tools)




        this.UiController = new UiController(this.globalstore)
        this.globalstore.add('UiController', this.UiController)

        this.init = this.init.bind(this)
        this.redraw = this.redraw.bind(this)


        this.init()
    }

    init() { }

    redraw() {

        let p1 = this.ctx.transformedPoint(0, 0);
        let p2 = this.ctx.transformedPoint(this.canvas.width, this.canvas.height);
        this.ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        this.items.map(item => {
            item.draw()
        })
    }
}

export default App;