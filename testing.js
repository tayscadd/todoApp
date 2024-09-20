const todos = [
    {
        todoID: 0,
        todoName: 'Users can view todos',
        todoStatus: false,
        todoDue: null,
        todoCategory: 'School Work'
    },
    {
        todoID: 1,
        todoName: 'Users can add todos',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 2,
        todoName: 'Users can edit todos',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 3,
        todoName: 'Users can complete todos',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 4,
        todoName: 'User can delete todos',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 5,
        todoName: 'UI shows how many todos there are left to complete',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 6,
        todoName: 'User can delete all completed todos with a button: "Clear Completed Todos"',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    },
    {
        todoID: 7,
        todoName: 'You have to use an array of objects as tyhe source of data.',
        todoStatus: false,
        todoDue: null,
        todoCategory: null
    }
]
const categories = [
    "School Work",
    "Work",
    "Hobby",
    "Other"
]

// Used to get the starting number that new todos should be assigned to.
let IDcounter = todos.length
// Handles the Todos Left:
let todosLeftCounter = 0


//// Creating new todos
function addNewTodo(name, status, due=null, category=null) {
    let newTodo = {
        todoID: IDcounter, 
        todoName: name, 
        todoStatus: status,
        todoDue: due,
        todoCategory: category
    }
    IDcounter += 1
    todos.push(newTodo)
    renderDOM()
}
function newTodoInputClicked() {
    let todoName = document.querySelector('#todoItemInput')
    let todoDue = document.querySelector('#todoItemDue')
    let dueDate = todoDue.value

    if (todoName.value !== '') {
        if (todoDue.value === '' || todoDue.value === undefined) {
            dueDate = null
        }
        addNewTodo(todoName.value, false, dueDate)
        todoDue.value = ''
        todoName.value = ''
    }
}
/*Listeners for above functions*/
document.querySelector('#addTodoItem').addEventListener('click', newTodoInputClicked())
document.querySelector('#todoItemInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        newTodoInputClicked()
    }
})


////

//// Deleting completed todos
document.querySelector('#removeCompletedBtn').addEventListener('click', () => {removeAllCompleted()})
function removeAllCompleted() {
    //Remove from array
    for (let i=0; i<todos.length; i++) {
        if (todos[i].todoStatus === true) {
            todos.splice(i, 1)
            // If the array gets spliced, than the index should be put back one so it doesn't skip one.
            i -= 1
        }
    }
    //Remove from DOM
    renderDOM()
}


//// Renders (Updates) the todos into the DOM
function renderDOM() {
    const todoList = document.querySelector('.todoItemContainer')
    todoList.innerHTML = ""
    
    todos.forEach(todo => {

        function createButton(txt,cls) {
            return `<button class="${cls}">${txt}</button>`
        }
        function createDiv(txt,cls) {
            return `<div class="${cls}">${txt}</div>`
        }

        // Creates the Category Div
        categoryDIV = createDiv((
            createButton(`${todo.todoCategory === null ? "" : todo.todoCategory}`, 'category')
                +createButton("Change Category", 'change')),
            "category-group")

        // Creates the Main content of the Div
        todoBoxDiv = createDiv(
            `<span>${todo.todoName}</span>
                ${createButton("Delete",'deleteBtn')
                +createButton('Edit','editBtn')}`,
            "todoBox")

        // Allows a user to change the todo.todoName and todo.todoCategory of the data.
        inputDiv = createDiv(
            `<input>
                ${createButton("Cancel",'cancelBtn')
                +createButton("Confirm",'confirmBtn')}`
            , "inputBox")

        todoHTML = `<div data.id="${todo.todoID}">${categoryDIV + todoBoxDiv + inputDiv}</div>`

        todoList.insertAdjacentHTML('beforeend', todoHTML)
    })

}




// Used for varius debugging
function debugBtn() {
    console.log(todos)
    console.log(IDcounter)
}