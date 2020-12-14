import { pl } from "date-fns/locale";

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
            item.classList.add('task')

            const t = document.createElement('div');
            t.classList.add('taskDesc')
            const taskName = document.createElement('div')
            taskName.textContent = task.name;
            const taskDueDate = document.createElement('div');
            taskDueDate.textContent = task.dueDate;
            t.append(taskName, taskDueDate);

            const editBtn = document.createElement('button');
            editBtn.classList.add('bn632-hover', 'bn26');
            editBtn.textContent = '...';

            const delBtn = document.createElement('button');
            delBtn.classList.add('bn632-hover', 'bn27');
            delBtn.textContent = 'x';

            item.append(t, editBtn, delBtn);
            tasks.appendChild(item);
        });
        this.taskView.appendChild(tasks);
    }

    render() {
        this.content.append(
        this.createTitle(),
        this.createNavbar(),
        this.createTaskView()
        );
    }
}

export default DOMController;