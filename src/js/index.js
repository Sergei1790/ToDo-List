import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import {storageAvailable} from './handlers';
import {Project} from './projects';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const project1 = new Project('Project 1');
// console.log(defaultProject.id); 
domManipulation.displayProjects()
if (storageAvailable("localStorage")) {
   console.log('asdasd');
} else {
    alert('Local Storage is not available 😢😢')
}
if (!localStorage.getItem("bgcolor")) {
  
} else {
  
}
