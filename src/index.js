import Project from './modules/project';
import DOMController from './modules/DOMController';
import './assets/styles/style.css'
import parse from 'date-fns/parse'

// Render initial page view
const display = new DOMController();
display.render();

// container for all the projects
let listOfProjects = [
    new Project('Default Project'),
    new Project('Project 2'),
];

const parseDate = (date) => {
    let dateParsed = parse(
        date,
        'yyyy-mm-dd',
        new Date()
    )
    return dateParsed.toDateString();
}

// Dummy tasks
listOfProjects[0].addTask("Gym", parseDate('2020-12-20'));
listOfProjects[0].addTask("Run", parseDate('2020-12-20'));
listOfProjects[1].addTask("Eat", parseDate('2020-12-20'));
display.addProject(listOfProjects[0]);
display.addProject(listOfProjects[1]);
// console.table(listOfProjects[0].tasks);

let currentProject;

const projects = document.querySelectorAll('.project');
const projectViewContainer = document.getElementById('taskView');

const update = () => {
    let numOfClicks = 0;
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const found = listOfProjects.find(proj => proj.name === project.innerHTML);
            currentProject = found;
            console.log(currentProject);
            if (typeof found !== 'undefined' && numOfClicks === 0) {
                projectViewContainer.removeChild(projectViewContainer.lastChild);
                display.displayTasks(found.tasks);
                numOfClicks += 1;
            } else {
                projectViewContainer.innerHTML = "";
                display.displayTasks(found.tasks);
                numOfClicks += 1;
            };
            // #taskView > div > div:nth-child(1) > button.bn632-hover.bn27
            const deleteButtons = document.querySelectorAll('button.bn27');
            let num = 0;
            deleteButtons.forEach(button => {
                button.setAttribute('data-id', num);
                button.addEventListener('click', () => {
                    let index = button.getAttribute('data-id')
                    currentProject.tasks.splice(index, 1);
                    console.table(currentProject.tasks);
                    let task = document.querySelector(`[data-id= "${index}"]`).parentNode
                    console.log(task);
                    // projectViewContainer.removeChild(task.parentNode);
                    projectViewContainer.lastChild.removeChild(task);
                })
                num += 1;
            })
            console.log(deleteButtons);
            let addTaskBtn = document.getElementById("modal-btn");
            let modal = document.querySelector(".modal");
            let closeBtn = document.querySelector(".close-btn");
            addTaskBtn.onclick = function () {
                modal.style.display = "block";
            };
    
            closeBtn.onclick = function () {
                modal.style.display = "none";
            };
    
            window.onclick = function (e) {
                if (e.target == modal) {
                    modal.style.display = "none";
                }
            };
        });
    });
};



const getInputValues = () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const dropdown = document.getElementById('dropdown').value;
    const date = document.getElementById('time').value;
    // console.log(name, description, dropdown);
    let dateParsed = parse(
        date,
        'yyyy-mm-dd',
        new Date()
    )
    let d = dateParsed.toDateString()
    // console.log(x)
    return {name, d, description, dropdown};
}

update();
let addBtn = document.getElementById('addTaskBtn');

// store values from form
const addNewTask = () => {
    addBtn.addEventListener('click', () => {
        let modal = document.querySelector(".modal");
        let form = getInputValues();
        console.log(form);
        currentProject.tasks.push(form);
        modal.style.display = "none";
        // projectViewContainer.appendChild()
        let t = display.renderTask(
            form.name,
            form.d, 
        )
        console.log(t);
        projectViewContainer.lastChild.appendChild(t);
        let num = 0;
        const deleteButtons = document.querySelectorAll('button.bn27');
        deleteButtons.forEach(button => {
            button.setAttribute('data-id', num);
            button.addEventListener('click', () => {
                let index = button.getAttribute('data-id')
                currentProject.tasks.splice(index, 1);
                console.table(currentProject.tasks);
                let task = document.querySelector(`[data-id= "${index}"]`).parentNode
                console.log(task);
                // projectViewContainer.removeChild(task.parentNode);
                projectViewContainer.lastChild.removeChild(task);
            })
            num += 1;
        })

    });
};



const removeTask = () => {
}

addNewTask();