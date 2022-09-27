class BaseServices {
    constructor(model) {
        this.BaseModel = model
    }
    list(where) {
        return this.BaseModel.find(where || {})
    }
    insert(data) {
        return new this.BaseModel(data).save()
    }
    findOne(where) {
        return this.BaseModel.findOne(where)
    }
    changePassword(where, data) {
        return this.BaseModel.findOneAndUpdate(where, data, { new: true })
    }
    update(id, data) {
        return this.BaseModel.findByIdAndUpdate(id, data, { new: true })
    }
    delete(id) {
        return this.BaseModel.findByIdAndDelete(id)
    }

}

module.exports = BaseServices