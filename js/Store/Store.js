
class Store {

    constructor(name = 'globalstore') {

        this.name = name

        /* Bindlings */
        this.add = this.add.bind(this)
        this.has = this.has.bind(this)

    }

    add(key, value) {

        if (key in this) throw Error('Key is already in store')

        this[key] = value

    }

    has(key) {

        if (key in this) return true

        return false

    }
}

export default Store