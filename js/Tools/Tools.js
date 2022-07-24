import RetangleTool from './RetangleTool'
class Tools {

    constructor(globalstore) {
        this.globalstore = globalstore;

        this.RetangleTool = new RetangleTool(globalstore)

    }




}

export default Tools; 