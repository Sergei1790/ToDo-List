const tasks = (() => {
    function Task(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    function createTask() {
        const task = new Task(
            document.getElementById('sund-task-title').value,
            document.getElementById('sund-task-desc').value,
            document.getElementById('sund-task-dueDate').value,
            document.getElementById('sund-task-priority').value
        );
        console.log(task);
    }
    return{
        createTask
    }
})();
export default tasks;

