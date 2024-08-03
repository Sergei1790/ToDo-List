class Project{
    static allProjects = [];
    
    constructor(name){
        this.name = name;
        this.tasks = [];
        // after creating instance of project we push it in allProjects
        Project.allProjects.push(this);
    }
}
class ProjectManager{
    constructor() {
        this.currentProjectIndex = null;
    }
    createProject() {
        const project = new Project(document.getElementById('sund-project-title').value);
        return project;
    }
    openProject(event){
        this.currentProjectIndex = event.target.closest('.sund-project').getAttribute('data-project-index');
        const currentProject = Project.allProjects[this.currentProjectIndex];
        document.getElementById('sund-project__title').textContent = currentProject.name;
        console.log(currentProject.name); 
        document.getElementById('sund-project-display').setAttribute('data-project-index', this.currentProjectIndex);
    }
    deleteProject(event) {
        const currentProjectIndex = parseInt(event.target.closest('.sund-project').getAttribute('data-project-index'), 10);
        Project.allProjects.splice(currentProjectIndex, 1);
        // if (Project.allProjects.length === 0) {
        //     new Project('Default Project');
        // }
    }
    editProject(event) {
        this.currentProjectIndex = event.target.closest('.sund-project').getAttribute('data-project-index');
        const currentProject = Project.allProjects[this.currentProjectIndex];
        document.getElementById('sund-project-title').value = currentProject.name;
        console.log('Editing project:', currentProject);
    }
    updateProject() {
        const currentProject = Project.allProjects[this.currentProjectIndex];
        currentProject.name = document.getElementById('sund-project-title').value;
        document.getElementById('sund-project__title').textContent = currentProject.name;
    }
}

const projectManager = new ProjectManager();
export { Project, projectManager};