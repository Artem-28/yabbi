import Role from './Role'

class User {
    constructor(data){
        this._id = data.id
        this._name = data.name
        this._email = data.email
        this._lastName = data.last_name
        this._roleId = data.role_id
        this._role = null
    }

    get id() { return this._id }

    get name() { return this._name }

    get lastName() { return this._lastName }

    get roleId() { return this._roleId }

    get fullName() { return `${this._name} ${this._lastName}`}

    get role() {return this._role }

    setRole(role) {
        if(role instanceof Role) {
            this._role = role
        } else {
            throw 'Неверный формат роли'
        }
        
    }
}

export default User