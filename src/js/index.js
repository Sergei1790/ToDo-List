import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import {storageAvailable} from './handlers';
import {Project} from './projects';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
// const defaultProject = new Project('Default Project');
// const project1 = new Project('Project 1');

// console.log(defaultProject.id); 

// if(Project.allProjects === []){
//     console.log('object');
// }
const storedProjects = localStorage.getItem("allProjects");
        if (storedProjects) {
            Project.allProjects = JSON.parse(storedProjects);
        }
domManipulation.displayProjects()
