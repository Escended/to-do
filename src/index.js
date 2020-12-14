import item from './modules/item';
import Project from './modules/project';
import DOMController from './modules/DOMController';
import './assets/styles/style.css'

const display = new DOMController();
display.render();
let listOfProjects = [
    new Project('Default Project'),
    new Project('Project 2'),
];

listOfProjects[0].addTask("task1", "tomorrow");
listOfProjects[0].addTask("task2", "tuesday");
listOfProjects[0].addTask("task3", "wednesday");
listOfProjects[0].addTask("task4", "tomorrow");
listOfProjects[0].addTask("task5", "tuesday");
listOfProjects[0].addTask("task6", "wednesday");
listOfProjects[1].addTask("Task1", "tomorro"); 
console.table(listOfProjects[0].tasks);
console.log(listOfProjects[0]);

// event listeners to update DOM 
const update = () => {
    display.addProject(listOfProjects[0]);
    display.addProject(listOfProjects[1]);

    // Get correct project 
    const projects = document.querySelectorAll('.project');
    const projectViewContainer = document.getElementById('taskView');
    projects.forEach(project => {
        project.addEventListener('click', () =>{
            const found = listOfProjects.find(proj => proj.name === project.innerHTML);
            console.log(found);
            if (found) {
                projectViewContainer.removeChild(projectViewContainer.lastChild);
                display.displayTasks(found.tasks);
            }
        })
    })
    //console.log(projects);

}

update();

// Now I have a project and a list of tasks inside the project 
// How do I display this project inside the navbar? 
// Create a new element 



