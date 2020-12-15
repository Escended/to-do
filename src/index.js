import Project from './modules/project';
import DOMController from './modules/DOMController';
import './assets/styles/style.css'

// Render initial page view
const display = new DOMController();
display.render();

// container for all the projects
let listOfProjects = [
    new Project('Default Project'),
    new Project('Project 2'),
];

// Dummy tasks
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
    let numOfClicks = 0;
    projects.forEach(project => {
        project.addEventListener('click', () => {
            // const addTaskButton = document.querySelector('.addTaskBtn');

            const found = listOfProjects.find(proj => proj.name === project.innerHTML);
            if (typeof found !== 'undefined' && numOfClicks === 0) {
                projectViewContainer.removeChild(projectViewContainer.lastChild);
                display.displayTasks(found.tasks);
                numOfClicks += 1;
                console.log("im in if")
                console.log(numOfClicks)
            } else {
                projectViewContainer.innerHTML = "";
                display.displayTasks(found.tasks);
                numOfClicks += 1;
                console.log('im in else')
                console.log(numOfClicks)
            }
            let addTaskBtn = document.getElementById("modal-btn");
            let modal = document.querySelector(".modal");
            let closeBtn = document.querySelector(".close-btn");
            
            addTaskBtn.onclick = function () {
                modal.style.display = "block";
            }
        
            closeBtn.onclick = function () {
                modal.style.display = "none";
            }
        
            window.onclick = function (e) {
                if (e.target == modal) {
                    modal.style.display = "none";
                }
            }
        });
    });


}

update();

// Now I have a project and a list of tasks inside the project 
// How do I display this project inside the navbar? 
// Create a new element 



