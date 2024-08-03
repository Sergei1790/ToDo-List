import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import {storageAvailable} from './handlers';
import {Project} from './projects';

// This is not needed, just show if we are in dev mode
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
// This and handlers.js are not needed, just show if localStorage is working
if (storageAvailable("localStorage")) {
    console.log('localStorage available');
} else {
    console.log('localStorage NOT available');
}


// If we have saved projects in localStorage we load them in our Project.allProjects array
const storedProjects = localStorage.getItem("allProjects");
if (storedProjects) {
    Project.allProjects = JSON.parse(storedProjects);
} 
// Check if there are n projects, create default
if (Project.allProjects.length === 0) {
    new Project('Default Project');
}
// Initial project display
domManipulation.displayProjects();

// Initial selecting default project to display when visiting page
window.onload = () => {
    document.querySelector('.sund-project[data-project-index="0"]').click();
};

