import moment from "moment"
import User from "./User"

class Post {
    constructor(data){
        this._id = data.id
        this._title = data.title
        this._content = data.content
        this._like = data.like
        this._userId = data.user_id
        this._created = data.created_at
        this._update = data.update_at
        this._author = null
    }

    get id() {return this._id}

    get title(){ return this._title }

    get content() { return this._content }

    get like() { return this._like }

    get userId() { return this._userId}

    get created() { return this._created }

    get update() {
        const update = new Date(this._update)
        const year = update.getFullYear()
        const mouth = update.getMonth()
        const day = update.getDate()
        const hours = update.getHours()
        const minutes = update.getMinutes()
        moment.locale('ru')
        return moment([year, mouth, day, hours, minutes]).fromNow()
    }

    get author() {return this._author }

    setAuthor(author){
        if(author instanceof User) {
            this._author = author
        } else {
            throw 'Неверный формат автора'
        }
    }

    setLike(value) {
        this._like+=value
    }
}
export default Post