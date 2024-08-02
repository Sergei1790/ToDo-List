import {Project} from './projects';
import { format, parseISO, parse, isValid, addDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

class Task {
    constructor(title, description, dueDate, priority, projectIndex) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.projectIndex = projectIndex;
        this.id = this.title.trim().toLowerCase().replace(/\s+/g, '-') + '-' + (Math.floor(Math.random() * 100) + 1);
    }
}

class TaskManager {
    constructor() {
        this.currentTaskIndex = null;
        this.taskArray = [];
    }

    createTask() {
        // Finding the index of a project where we will add task
        const dataProjectIndex = document.getElementById('sund-project-display').getAttribute('data-project-index');
        // Corresponding task array inside project object
        this.taskArray = Project.allProjects[dataProjectIndex].tasks;

        // Gathering values form inputs of modal and creating task
        const dueDateInput = document.getElementById('sund-task-dueDate').value;
        let formattedDueDate;
        
          if (dueDateInput) {
            try {
                formattedDueDate = format(parseISO(dueDateInput), 'dd.MM.yyyy');
            } catch (error) {
                console.error('Invalid date format:', error);
                formattedDueDate = 'No Due Date';
            }
        } else {
            formattedDueDate = 'No Due Date';
        }
        const priority = document.getElementById('sund-task-priority').value !== '' ? document.getElementById('sund-task-priority').value : 'low'; 
        const task = new Task(
            document.getElementById('sund-task-title').value,
            document.getElementById('sund-task-desc').value,
            formattedDueDate,
            // document.getElementById('sund-task-priority').value
            priority,
            dataProjectIndex
        );

        // Pusjing task in project(with corresponding index) into his tasks array)
        this.taskArray.push(task);
        console.log(task);
        return task;
    }

    deleteTask(event) {
        // const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        // this.currentTaskIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-task-index'), 10);

        const currentProjectIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-project-index'), 10);
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;
        
        const currentTaskId = event.target.closest('.sund-task').getAttribute('data-id');
        this.currentTaskIndex = this.taskArray.findIndex(task => task.id === currentTaskId);

        this.taskArray.splice(this.currentTaskIndex, 1);
        console.log(this.taskArray);
    }

    editTask(event) {
        // const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        // this.currentTaskIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-task-index'), 10);
        
        const currentProjectIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-project-index'), 10);
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;
        console.log('EDITING',  this.taskArray);

        const currentTaskId = event.target.closest('.sund-task').getAttribute('data-id');
        this.currentTaskIndex = this.taskArray.findIndex(task => task.id === currentTaskId);


        // Populating modal inputs with current task info
        document.getElementById('sund-task-title').value = this.taskArray[this.currentTaskIndex].title;
        document.getElementById('sund-task-desc').value = this.taskArray[this.currentTaskIndex].description;
        
        const dueDateInput = document.getElementById('sund-task-dueDate');
        if (this.taskArray[this.currentTaskIndex].dueDate !== 'No Due Date') {
            // convert string into Date object
            const parsedDate = parse(this.taskArray[this.currentTaskIndex].dueDate, 'dd.MM.yyyy', new Date());
            if (isValid(parsedDate)) {
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                document.getElementById('sund-task-dueDate').value = formattedDate;
            } else {
                console.error('Invalid date:', this.taskArray[this.currentTaskIndex].dueDate);
                dueDateInput.value = '';
            }
        } else {
            dueDateInput.value = '';
        }
        document.getElementById('sund-task-priority').value = this.taskArray[this.currentTaskIndex].priority;
    }

    updateTask() {
        const task = this.taskArray[this.currentTaskIndex];

        // Gathering values form inputs of modal and updating existing task
        task.title = document.getElementById('sund-task-title').value;
        task.description = document.getElementById('sund-task-desc').value;

        const dueDateInput = document.getElementById('sund-task-dueDate').value;
        let formattedDueDate;

        if (dueDateInput) {
            try {
                formattedDueDate = format(parseISO(dueDateInput), 'dd.MM.yyyy');
            } catch (error) {
                console.error('Invalid date format:', error);
                formattedDueDate = 'No Due Date';
            }
        } else {
            formattedDueDate = 'No Due Date';
        }

        task.dueDate = formattedDueDate;
        task.priority = document.getElementById('sund-task-priority').value;

        console.log('Task Updated:', task);
        console.log('Task Array:', this.taskArray);
    }

    completeTask(event){
        // const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        // this.currentTaskIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-task-index'), 10);
       
        const currentProjectIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-project-index'), 10);
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;

        const currentTaskId = event.target.closest('.sund-task').getAttribute('data-id');
        this.currentTaskIndex = this.taskArray.findIndex(task => task.id === currentTaskId);

        // Toggle the completed property
        this.taskArray[this.currentTaskIndex].completed = !this.taskArray[this.currentTaskIndex].completed;
        console.log(this.taskArray[this.currentTaskIndex].completed);
    }

    allTasks(){
        document.getElementById('sund-project-display').setAttribute('data-project-index', 'allTasks');
        const allTasks = Project.allProjects.flatMap(project => project.tasks);
        console.log('All Tasks:', allTasks);
        return allTasks;
    }

    todayTasks(){
        document.getElementById('sund-project-display').setAttribute('data-project-index', 'todayTasks');
        const formattedTodayDate  = format(new Date(), 'dd.MM.yyyy');
        const todayTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.dueDate === formattedTodayDate)
        );
        console.log('Today Tasks:', todayTasks);
        return todayTasks;
    }

    weekTasks(){
        document.getElementById('sund-project-display').setAttribute('data-project-index', 'weekTasks');
        const today = startOfDay(new Date());
        const endDate = endOfDay(addDays(today, 6));

        const upcomingTasks = Project.allProjects.flatMap(project =>
            project.tasks.filter(task => {
                // Parse the dueDate from string to Date object
                const dueDate = parse(task.dueDate, 'dd.MM.yyyy', new Date());
                return isWithinInterval(dueDate, { start: today, end: endDate });
            })
        );
        console.log('Upcoming Tasks:', upcomingTasks);
        return upcomingTasks;
    }

    importantTasks(){
        document.getElementById('sund-project-display').setAttribute('data-project-index', 'importantTasks');
        const importantTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.priority === 'high')
        );
        console.log('Important Tasks:', importantTasks);  
        return importantTasks;
    }

    completedTasks(){
        document.getElementById('sund-project-display').setAttribute('data-project-index', 'completedTasks');
        const completedTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.completed === true)
        );
        console.log('Completed Tasks:', completedTasks);
        return completedTasks;
    }
}

const taskManager = new TaskManager();
export {taskManager};

