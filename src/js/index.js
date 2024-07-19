import '../css/style.css';
import '../css/fontawesome.min.css';
import {domManipulation} from './DOM';
import tasks from './tasks';
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
domManipulation.taskModal()



