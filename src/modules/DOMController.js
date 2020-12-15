import { pl } from "date-fns/locale";
import Project from './project'

class DOMController {
    constructor() {
        this.content = document.getElementById('content');
        this.currentProject; 
    }

    createTitle() {
        this.title = document.createElement('div');
        this.title.id = 'title';
        this.title.textContent = "Todo App";
        return this.title;
    }

    createNavbar() {
        this.navbar = document.createElement('div');
        this.navbar.id = 'navbar';
        //this.navbar.textContent = 'Navbar';
        
        this.navbar.append(this.addProjectButton('Add Project'), this.CreateProjectsView())
        return this.navbar;
    }

    CreateProjectsView() {
        this.projects = document.createElement('div');
        this.projects.id = 'projectsView';
        // this.projects.textContent = 'Projects'
        return this.projects;
    }
    // Add a new project to the project view
    addProjectButton(name) {
        const btn = document.createElement('button');
        btn.classList.add('projectBtn');
        btn.textContent = name;
        return btn
    }

    addProject(project) {
        //console.log(this.projects)
        const proj = document.createElement('div');
        proj.classList.add('project');
        proj.textContent = project.name;
        this.projects.appendChild(proj);
    }


    createTaskView() {
        this.taskView = document.createElement('div');
        this.taskView.id = 'taskView';
        //this.taskView.textContent = 'Tasks';
        
        const placeholder = document.createElement('div');
        placeholder.classList.add('placeholder');
        placeholder.textContent = "Open a project to view tasks"
        this.taskView.appendChild(placeholder);

        return this.taskView;
    }
    
    displayTasks(taskList) {
        const tasks = document.createElement('div');
        taskList.forEach(task => {
            let item = document.createElement('div');
            item.classList.add('task');

            const t = document.createElement('div');
            t.classList.add('taskDesc');
            const taskName = document.createElement('div');
            taskName.textContent = task.name;
            const taskDueDate = document.createElement('div');
            taskDueDate.textContent = task.dueDate;
            t.append(taskName, taskDueDate);

            const editBtn = document.createElement('button');
            editBtn.classList.add('bn632-hover', 'bn26');
            editBtn.textContent = '...';

            const delBtn = document.createElement('button');
            delBtn.classList.add('bn632-hover', 'bn27');
            delBtn.innerHTML = '&times;';
            // Description and buttons for each task
            item.append(t, editBtn, delBtn);
            tasks.appendChild(item);
        });

        const addTaskBtn = this.addProjectButton('Add Task')
        addTaskBtn.id = 'modal-btn';
        
        addTaskBtn.classList.add('addTaskBtn');
        this.taskView.append(addTaskBtn, tasks);
    }
    createModalBtn() {
        const modalBtn = this.addProjectButton('Modal');
        modalBtn.id = 'modal-btn';
        return modalBtn;
    }
    createModalView(taskName) {

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '&times;'

        const content = document.createElement('p');
        content.textContent = taskName;

        modalContent.append(
            closeBtn, 
            content,
            this.createTaskInputs('Type a todo...'),
            this.createTaskInputs('Description...'),
            this.createDropDownInput(),
            );

        modal.appendChild(modalContent);
        return modal;
    }

    createTaskInputs(dummyText) {
        const inputContainer = document.createElement('div');
        const input = document.createElement('input');
        input.placeholder = dummyText;
        inputContainer.append(input);
        return inputContainer;
    }

    createDropDownInput() {
        const priority = document.createElement('SELECT');
        priority.setAttribute('id', 'taskInputs')

        const low = document.createElement('option');
        low.setAttribute('value', 'low');
        low.textContent = "low";

        const medium = document.createElement('option');
        medium.setAttribute('value', 'medium');
        medium.textContent = "medium"
        const high = document.createElement('option');

        high.setAttribute('value', 'high');
        high.textContent = "high";
        priority.append(low, medium, high);

        return priority;
    }

    getInputValues() {

    }

    render() {
        this.content.append(
        this.createTitle(),
        this.createNavbar(),
        this.createTaskView(),
        // this.createModalBtn(),
        this.createModalView('Add Task'),
        );
    }
}

export default DOMController;