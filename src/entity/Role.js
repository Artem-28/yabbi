class Role {
    constructor(data) {
        this._id = data.id
        this._type = data.type
        this._title = data.title
    }

    get id() { return this._id }

    get title() { return this._title }

    get type() { return this._type }
}

export default Role