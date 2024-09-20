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

/*
Template Literals - Use to redo the complex document create stuff
    // `<div>${txt}</div>`
Event listeners on the parents who can listen and find the content instead of having it do the stuff on the individual todos and have lots of memory errors.
    // data-{attribute} allows you to set a DOM elements data to access via js
    // You can access that data by [ELEMENT].dataset.{attribute} (lowercase)
    // insertAdjacentHTML ("beforeend") -- Adds to the last part of it's child
    // ARRAY.find(OBJ => {OBJ.VALUE === SEARCHEDVARIABLE}) // Returns the value if ===
*/

// Used to get the starting number that new todos should be assigned to.
let IDcounter = todos.length
// Handles the Todos Left:
let todosLeftCounter = 0

// Handles creating the object and adding to the Array, then sends the info to the DOM adding Function (newTodoDOM)
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
    newTodoDOM(newTodo)
}

// Creates the Elements and adds event triggers
function newTodoDOM(todoObject) {
    const todoList = document.querySelector('.todoItemContainer')

    // Creating the Elements
    let todoContainer = document.createElement('div')

    let todoBox = document.createElement('div')
    let todoName = document.createElement('span')
    let todoDeleteBtn = document.createElement('button')
    let todoEditBtn = document.createElement('button')

    let inputBox = document.createElement('div')
    let inputArea = document.createElement('input')
    let inputConfirm = document.createElement('button')
    let inputCancel = document.createElement('button')

    let categoryBox = document.createElement('div')
    if (todoObject.todoCategory !== null) {
        var category = document.createElement('button') // change innerhtml to category
    }
    let changeCategory = document.createElement('button')

    
    // Handling Classes for styles
    todoContainer.classList.add('todoItem')
    todoDeleteBtn.classList.add('deleteBtn')
    todoEditBtn.classList.add('editBtn')
    if (todoObject.todoStatus === true) {todoName.classList.toggle('strike')}
    inputConfirm.classList.add('confirmBtn')
    inputCancel.classList.add('cancelBtn')
    todoBox.classList.add('todoBox')
    inputBox.classList.add('inputBox')
    categoryBox.classList.add('category-group')
    if (category) {category.classList.add('category')}
    changeCategory.classList.add('change')
    
    // Glueing the Elements together
    if (category) {categoryBox.appendChild(category)}
    categoryBox.appendChild(changeCategory)
    todoContainer.appendChild(categoryBox)

    todoBox.appendChild(todoName)
    todoBox.appendChild(todoDeleteBtn)
    todoBox.appendChild(todoEditBtn)
    todoContainer.appendChild(todoBox)

    inputBox.appendChild(inputArea)
    inputBox.appendChild(inputCancel)
    inputBox.appendChild(inputConfirm)
    todoContainer.appendChild(inputBox)

    // Adding necessary content to them
    todoName.innerHTML = todoObject.todoName
    todoDeleteBtn.innerHTML = 'Delete'
    todoEditBtn.innerHTML = 'Edit'
    inputConfirm.innerHTML = 'Confirm'
    inputCancel.innerHTML = 'Cancel'
    if (category) {category.innerHTML = todoObject.todoCategory}
    changeCategory.innerHTML = 'Change Category'

    //Supporting Function for Todos Left
    function todosLeftArithmetic() {
        let todosLeft = document.querySelector('#todosLeft')
        if (todoName.classList.contains('strike')) {todosLeftCounter -= 1}
        else {todosLeftCounter += 1}
        todosLeft.innerHTML = String(todosLeftCounter)
    }

    /* Connecting functions to the Elements */

    // Function that allows for users to edit the status of a todo.
    // Automatically changes the status within the array as well.
    todoName.addEventListener('click', () => {
        todoName.classList.toggle('strike')
        todosLeftArithmetic()
        todoObject.todoStatus = (todoObject.todoStatus===true) ? false : true
    })

    //Handles the Delete Button. Removes it from the array and DOM
    todoDeleteBtn.addEventListener('click', () => {
        //While the todos should have the index within their object, just to make sure I'll find their index in here.
        let todoObjectIndex = todos.indexOf(todoObject)
        todos.splice(todoObjectIndex, 1)
        todoList.removeChild(todoContainer)
        if (todoName.classList.contains('strike') === false) {
            todoName.classList.add('strike')
            todosLeftArithmetic()
        }
    })

    //Handles the Edit Button
    todoEditBtn.addEventListener('click', () => {
        todoContainer.classList.add('editing')
    })

    // Handles the Cancel Button
    inputCancel.addEventListener('click', () => {
        todoContainer.classList.remove('editing')
    })

    // Handles the Confirm Button
    inputArea.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { 
            let txt = inputArea.value
            if (txt != "") {
                todoObject.todoName = txt
                todoName.innerHTML = txt
                todoContainer.classList.remove('editing')
            }
            inputArea.value = ""
        }
    })
    inputConfirm.addEventListener('click', () => {
        let txt = inputArea.value
        if (txt != "") {
            todoObject.todoName = txt
            todoName.innerHTML = txt
            todoContainer.classList.remove('editing')
        }
        inputArea.value = ""
    })

    // Adds the due date if there is one
    if (todoObject.todoDue !== null) {
        let dueDate = document.createElement('p')
        dueDate.classList.add('todoDueDate')
        dueDate.innerHTML = "Due: " + todoObject.todoDue
        todoContainer.appendChild(dueDate)
    }

    // Lets you delete the category
    if (category) {
        category.addEventListener('click', () => {
            // CHANGE HOW YOU HANDLE ALL OF THIS IT IS SO UGLY
        })
    }

    //Updates the Todos Left
    todosLeftArithmetic()

    //Appends the new todo Node to the Todo List on the DOM
    todoList.appendChild(todoContainer)
}

//Initialize from the original todos on startup:
todos.forEach((todo) => {newTodoDOM(todo)})

// Handles creating new todos from the Form
function handleNewTodos() {
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
document.querySelector('#addTodoItem').addEventListener('click', handleNewTodos())
document.querySelector('#todoItemInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        handleNewTodos()
    }
})

// Handles removeing compelted when the remove compelted button is clicked.
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
    let allTodosDOM = document.querySelectorAll('.todoItem')
    allTodosDOM.forEach((todo) => {
        let todoName = todo.querySelector('.todoBox > span')
        if (todoName.classList.contains('strike')) {
            todo.remove()
        }
    })
}

// Used for varius debugging
function debugBtn() {
    console.log(todos)
    console.log(IDcounter)
}