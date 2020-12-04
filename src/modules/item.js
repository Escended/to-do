//const { values } = require("lodash");

class Item {
    constructor(name, dueDate) {
        this.name = name;
        this.dueDate = dueDate;
        this.description = '';
        this.priority = 'low';
    }
    get name() {
        return this._name;
    }

    set name(value) {
        if (value.length > 10 || value.length < 2) {
            return;
        }
        this._name = value;
    }

    // get dueDate() {
    //     return this._dueDate;
    // }

}

export default Item;