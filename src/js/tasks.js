import {Project} from './projects';
import { format, parseISO, parse, isValid, addDays, isWithinInterval } from 'date-fns';

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        // this.status
        // this.projectIndex = parseInt(document.getElementById('sund-project-display').getAttribute('data-project-index'), 10);
        
        // Checking whether project is an instance of the Project class before accessing project.id
        // this.projectId = project instanceof Project ? project.id : project;
        // simpler ->
        // this.projectId = project.id;
        
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
        const task = new Task(
            document.getElementById('sund-task-title').value,
            document.getElementById('sund-task-desc').value,
            formattedDueDate,
            document.getElementById('sund-task-priority').value
        );

        // Pusjing task in project(with corresponding index) into his tasks array)
        this.taskArray.push(task);
        console.log(task);
        return task;
    }

    deleteTask(event) {
        const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;
        this.currentTaskIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-task-index'), 10);
        this.taskArray.splice(this.currentTaskIndex, 1);
        console.log(this.taskArray);
    }

    editTask(event) {
        const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;
        this.currentTaskIndex = event.target.closest('.sund-task').getAttribute('data-task-index');
        console.log('EDITING');
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
        const currentProjectIndex = event.target.closest('.sund-project-display').getAttribute('data-project-index');
        this.taskArray = Project.allProjects[currentProjectIndex].tasks;
        this.currentTaskIndex = parseInt(event.target.closest('.sund-task').getAttribute('data-task-index'), 10);
        // Toggle the completed property
        this.taskArray[this.currentTaskIndex].completed = !this.taskArray[this.currentTaskIndex].completed;
        console.log(this.taskArray[this.currentTaskIndex].completed);
    }

    allTasks(){
        const allTasks = Project.allProjects.flatMap(project => 
            project.tasks
        );
        console.log('All Tasks:', allTasks);
    }

    todayTasks(){
        const formattedTodayDate  = format(new Date(), 'dd.MM.yyyy');
        const todayTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.dueDate === formattedTodayDate)
        );
        console.log('Today Tasks:', todayTasks);
    }

    weekTasks(){
        const today = new Date();
        const endDate = addDays(today, 6);

        const upcomingTasks = Project.allProjects.flatMap(project =>
            project.tasks.filter(task => {
                // Parse the dueDate from string to Date object
                const dueDate = parse(task.dueDate, 'dd.MM.yyyy', new Date());
                return isWithinInterval(dueDate, { start: today, end: endDate });
            })
        );
        console.log('Upcoming Tasks:', upcomingTasks);
    }

    importantTasks(){
        const importantTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.priority === 'high')
        );
        console.log('Important Tasks:', importantTasks);  
    }

    completedTasks(){
        const completedTasks = Project.allProjects.flatMap(project => 
            project.tasks.filter(task => task.completed === true)
        );
        console.log('Completed Tasks:', completedTasks);
    }
}

const taskManager = new TaskManager();
export {taskManager};

