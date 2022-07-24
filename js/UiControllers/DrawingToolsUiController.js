import utils from "../utils";

import RetangleTool from '../Tools/RetangleTool'
import WorkBoard from '../Tools/WorkBoard'

import CursorImg from '../../images/cursor.png'
import RectangleImg from '../../images/rectangle.png'

class DrawingToolsUiController {

    constructor(globalstore) {

        this.globalstore = globalstore

        this.menusContainer = document.querySelector('.project-tools-container')
        this.CanvasContainer = document.getElementById('project-canvus')
        this.CanvasContainer.style.cursor = `-webkit-image-set(url('${CursorImg}') 1.25x) 4 4, auto`

        this.selectedTool = undefined
        this.workBoradAdded = false

        this.init()
        this.addEvent()
    }

    resetCursor() {
        this.CanvasContainer.style.cursor = `-webkit-image-set(url('${CursorImg}') 1.25x) 4 4, auto`
    }
    addEvent() {

        let selectedContainer = this.menusContainer.children[1]

        try {
            for (let key in this.menusContainer.children) {
                let item = this.menusContainer.children[key];


                item.addEventListener('click', (e) => {

                    if (selectedContainer && selectedContainer != item) {
                        selectedContainer.classList.remove('project-tools-selected')
                        item.classList.add('project-tools-selected')
                    }

                    this.selectedTool = item.id
                    selectedContainer = item

                    if (item.id == 'RetangleTool') this.CanvasContainer.style.cursor = `-webkit-image-set(url('${RectangleImg}') 1.25x) 4 4, auto`
                    else if (item.id == 'Cursor') this.CanvasContainer.style.cursor = `-webkit-image-set(url('${CursorImg}') 1.25x) 4 4, auto`
                    else if (item.id == 'WorkBoard') this.CanvasContainer.style.cursor = `-webkit-image-set(url('${RectangleImg}') 1.25x) 4 4, auto`

                    let clickEvent = (e) => {

                        let X = utils.getMouseCoords(e)[0] || 0
                        let Y = utils.getMouseCoords(e)[1] || 0

                        if (item.id == 'WorkBoard' && !this.workBoradAdded) {
                            let workBoard = new WorkBoard({
                                globalstore: this.globalstore,
                                type: 'desktop'
                            })

                            workBoard.draw()

                            this.globalstore.add('workBoard', workBoard)

                            this.globalstore.app.items.push(workBoard)

                            this.workBoradAdded = true

                            utils.checckInsidePoints([X, Y], [
                                this.globalstore.workBoard.x,
                                this.globalstore.workBoard.x + this.globalstore.workBoard.width,
                                this.globalstore.workBoard.y,
                                this.globalstore.workBoard.y + this.globalstore.workBoard.height,
                            ])

                        } else if (
                            item.id == 'RetangleTool' &&
                            this.workBoradAdded &&
                            utils.checckInsidePoints([X, Y], [
                                this.globalstore.workBoard.x,
                                this.globalstore.workBoard.x + this.globalstore.workBoard.width - 100,
                                this.globalstore.workBoard.y,
                                this.globalstore.workBoard.y + this.globalstore.workBoard.height - 100,
                            ])) {

                            let rectangle = new RetangleTool({
                                globalstore: this.globalstore,
                                x: X,
                                y: Y,
                            })
                            rectangle.draw()
                            this.globalstore.app.items.push(rectangle)

                        } else {

                            if (!this.workBoradAdded) {

                                this.globalstore.userMessageUiController.show('Ther is No WorkSpace to Create Items');

                                setTimeout(() => {
                                    this.globalstore.userMessageUiController.hide()
                                }, 3000)
                            }
                        }

                        item.classList.remove('project-tools-selected')
                        this.menusContainer.children[1].classList.add('project-tools-selected')
                        this.selectedTool = this.menusContainer.children[1].id
                        selectedContainer = this.menusContainer.children[1]

                        this.globalstore.canvas.removeEventListener('click', clickEvent)
                        this.resetCursor()
                    }

                    this.globalstore.canvas.addEventListener('click', clickEvent)

                })
            }
        } catch { (e) => { console.log(e); } }
    }
    init() { }

}

export default DrawingToolsUiController;