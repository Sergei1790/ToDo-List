import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import {Project, ProjectManager, defaultProject} from './projects';
import {Task, tasks} from './tasks';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const project1 = new Project('project1');
console.log(defaultProject.id);
domManipulation.displayProjects()



