import Item from './item';

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(name, dueDate) {
        this.tasks.push(new Item(name, dueDate));
    }

    getTask(name) {
        return this.tasks.find(element => element.name === name);
    }
    
    // removeTask(name) {
    //     this.tasks.pop
    // }
}

export default Project;

