class Todo {
    constructor() {
        this.todos = [];
    }

    add(todo) {
        this.todos.push(todo);
    }

    remove(index) {
        if (this.todos[index]) {
            this.todos.splice(index, 1);
        }
    }

    update(index, updatedTodo) {
        if (this.todos[index]) {
            this.todos[index] = updatedTodo;
        }
    }

    getAll() {
        return this.todos;
    }

    get(index) {
        return this.todos[index] || null;
    }

    clear() {
        this.todos = [];
    }
}

const todoList = new Todo();

todoList.add('Buy groceries');
todoList.add('Go for a Walk');
todoList.add('Read a book');

console.log(todoList.getAll());

todoList.remove(1);
console.log(todoList.getAll()); 

todoList.update(1, 'Read two books');
console.log(todoList.getAll()); 

console.log(todoList.get(0));
console.log(todoList.get(1)); 

todoList.clear();
console.log(todoList.getAll()); 
console.log(todoList.getAll())