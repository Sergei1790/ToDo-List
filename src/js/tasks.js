function Task(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}
const task1 = new Task('Посидеть', 'Посидеть за столом', 'до завтра', 'срочно');
Создать модалку для новой задачи 
По клику на кнопку открывается окно где задается 4 поля
 title, description, dueDate, priority
после заполнения создается новый обьект Task с задаными параметрвми и отображается на экране.
Там будет кнопка, которая удаляет таски