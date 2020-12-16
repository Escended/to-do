import Project from './project'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import parse from 'date-fns/parse'

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
        
        const addProject = this.addProjectButton('Add Project');
        addProject.classList.add('bn632-hover', 'bn26', 'addProjectBtn');
        this.navbar.append(addProject, this.CreateProjectsView())
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
    
    renderTask(name, date, description, priority) {
        let item = document.createElement('div');
        item.classList.add('task');

        const t = document.createElement('div');
        t.classList.add('taskDesc');
        const taskName = document.createElement('div');
        taskName.classList.add('taskName');
        taskName.textContent = name;
        const taskDueDate = document.createElement('div');
        taskDueDate.classList.add('taskDate');
        taskDueDate.textContent = date;
        t.append(taskName, taskDueDate);

        const editBtn = document.createElement('button');
        editBtn.classList.add('bn632-hover', 'bn26');
        editBtn.innerHTML = '&hellip;';

        const delBtn = document.createElement('button');
        delBtn.classList.add('bn632-hover', 'bn27');
        delBtn.innerHTML = '&times;';

        // Description and buttons for each task
        item.append(t, editBtn, delBtn);

        return item;
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
            taskName.classList.add('taskName');
            const taskDueDate = document.createElement('div');
            taskDueDate.classList.add('taskDate');
            taskDueDate.textContent = task.dueDate;
            t.append(taskName, taskDueDate);

            const editBtn = document.createElement('button');
            editBtn.classList.add('bn632-hover', 'bn26');
            editBtn.innerHTML = '&hellip;';

            const delBtn = document.createElement('button');
            delBtn.classList.add('bn632-hover', 'bn27');
            delBtn.innerHTML = '&times;';
            // Description and buttons for each task

            //priority strip 
            const priority = document.createElement('div');
            priority.classList.add('priorityStatus');

            item.append(t, editBtn, delBtn);
            tasks.appendChild(item);
        });


        const addTaskBtn = this.addProjectButton('Add Task')
        addTaskBtn.id = 'modal-btn';
        
        addTaskBtn.classList.add('bn632-hover', 'bn26', 'addTaskBtn');
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
        const addBtn = this.addProjectButton('Add');
        addBtn.id = 'addTaskBtn'
        addBtn.classList.add('bn632-hover', 'bn26', 'form-btn');

        modalContent.append(
            closeBtn, 
            content,
            this.createTaskInputs('Type a todo...', 'Name', 'name'),
            this.createTaskInputs('Description...', 'Description', 'description'),
            this.createDropDownInput(),
            this.createDateInput(),
            addBtn,
            );

        modal.appendChild(modalContent);
        return modal;
    }

    // general input box  
    createTaskInputs(dummyText, name, id) {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-box');
        
        const title = document.createElement('p');
        title.textContent = name;
        title.classList.add('input-styling');

        const input = document.createElement('INPUT');
        input.id = id;
        input.classList.add('input-styling-box');
        input.placeholder = dummyText;
        inputContainer.append(title, input);
        return inputContainer;
    }

    createDropDownInput() {
        const container = document.createElement('div');
        
        container.classList.add('input-box');
        const priority = document.createElement('SELECT');
        priority.setAttribute('id', 'dropdown');
        // priority.id = 'dropdown';

        const title = document.createElement('p');
        title.textContent = 'Priority';
        title.classList.add('input-styling');


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
        container.append(title, priority);
        return container;
    }

    createDateInput() {
        const date = document.createElement('div');
        date.classList.add('input-box');
        const title = document.createElement('p');
        title.textContent = 'Date';
        title.classList.add('input-styling');

        const timeInput = document.createElement('INPUT');
        timeInput.id = 'time';
        timeInput.setAttribute('type', 'date');
        date.append(title, timeInput);
        return date;
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