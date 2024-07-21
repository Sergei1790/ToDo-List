import {domManipulation} from './DOM';
import { format, parseISO } from 'date-fns';

const tasks = (() => {
    const taskArray = [];
    function Task(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    function createTask() {
        const dueDateInput = document.getElementById('sund-task-dueDate').value;
        let formattedDueDate;

        if (dueDateInput) {
            try {
                formattedDueDate = format(parseISO(dueDateInput), 'dd-MM-yyyy');
            } catch (error) {
                console.error('Invalid date format:', error);
                formattedDueDate = 'No Due Date';
            }
        } else {
            formattedDueDate = 'No Due Date';
        }
        const task = new Task(
            document.getElementById('sund-task-title').value,
            document.getElementById('sund-task-desc').value,
            formattedDueDate,
            document.getElementById('sund-task-priority').value
        );
        taskArray.push(task);
        console.log(taskArray);
        return task;
    }

    function deleteTask(event){
        if (event.target.classList.contains('delete-task')) {
            const task = event.target.closest('.sund-task');
            const dataIndex = parseInt(task.getAttribute('data-task-index'), 10);
            taskArray.splice(dataIndex, 1);
            console.log(taskArray);
        }
        domManipulation.displayTasksInProject();
    }
    return{
        taskArray,
        createTask,
        deleteTask
    }

})();
export default tasks;

