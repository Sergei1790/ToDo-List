import '../css/style.css';
import '../css/fontawesome.min.css';
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
document.getElementById('sund-add-task').addEventListener('click', () => {
    document.getElementById('sund-todo-modal').classList.add('show');
});