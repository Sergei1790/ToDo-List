import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import {Project, ProjectManager, defaultProject} from './projects';
import {Task, tasks} from './tasks';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
// domManipulation.taskModal()
const project222 = new Project('sssss');
const task = new Task('Task Title', 'Task Description', '2024-07-23', 'High');
console.log(defaultProject);
domManipulation.displayProjects()
defaultProject.displayProject(); 


