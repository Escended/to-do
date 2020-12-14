import Item from './item';
import DOMController from './DOMController';


class Project {
    
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(name, dueDate) {
        this.tasks.push(new Item(name, dueDate));
        this.setId();
    }

    getTask(name) {
        return this.tasks.find(element => element.name === name);
    }
    
    setId(){
        let index = 0;
        this.tasks.forEach( task => {
            task.id = index;
            index += 1;
        })
    }
    
    // removeTask(name) {
    //     this.tasks.pop
    // }
}

export default Project;

