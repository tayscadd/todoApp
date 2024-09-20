/*
GLOBALS
*/
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

/*
NEW TODOS FUNCTIONS
*/
// Creating new todos
let newTodoContainer = document.querySelector('.inputContainer')
newTodoContainer.addEventListener('click', (event) => {
    // This event listener checks to see if the button got clicked.
    if (event.target.id === 'addTodoItem') {
        let dueValue = event.target.parentNode.querySelector('#todoItemDue').value
        let inputValue = event.target.parentNode.querySelector('#todoItemInput').value
        let categoryValue = event.target.parentNode.querySelector('#todoItemCategory').value

        if (inputValue != '') {
            createNewTodo(inputValue, dueValue, categoryValue)
        }
    }
})
newTodoContainer.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let dueValue = event.target.parentNode.parentNode.querySelector('#todoItemDue').value
        let inputValue = event.target.parentNode.parentNode.querySelector('#todoItemInput').value
        let categoryValue = event.target.parentNode.parentNode.querySelector('#todoItemCategory').value

        if (inputValue != '') {
            createNewTodo(inputValue, dueValue, categoryValue)
        }
    }
})
function createNewTodo(name, due, category) {
    let newTodo = {
        todoID: IDcounter, 
        todoName: name, 
        todoStatus: false,
        todoDue: due == "" ? null : due,
        todoCategory: category == "" ? null : category
    }
    IDcounter += 1
    let formArea = document.querySelector('.newInputArea')
    formArea.reset()
    todos.push(newTodo)
    renderDOM()
}

/*
TODO LIST FUNCTIONS
*/
// Event Listener and feature functions
let todosContainer = document.querySelector('.todoItemContainer')
// Event listener for the todoList that finds the todoItem and sends it to the router to figure out what was clicked.
todosContainer.addEventListener('click', event => {
    // First, find the .todoItem container.
    if (event.target.classList.contains('todoItem')) {
        eventRouter(event, event.target)
    }
    let todoItem = recursiveNodeLookup(event.target.parentNode)
    if (todoItem != undefined) {
        eventRouter(event, todoItem)
    }
})
todosContainer.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        let inputValue = event.target.value
        // Finds the todo object after finding the corrasponding .todoItem container
        let todo = nodeTodoLookup(recursiveNodeLookup(event.target))
        handleNewInput(todo, inputValue)
    }
})
function recursiveNodeLookup(node, clsToLookUp = 'todoItem') {
    // Checks if the current node is what we are looking for.
    if (node.classList.contains(clsToLookUp)) {
        return node
    } else if (node === document.querySelector('body')) {
        return undefined
    } else {
        return recursiveNodeLookup(node.parentNode)
    }
}
function nodeTodoLookup(node) {
    let foundTodo = todos.find((todo) => {
        if (todo.todoID == Number(node.dataset.id)) {
            return true
        }
        return false
    })
    return foundTodo
}
function eventRouter(e, foundContainerNode) {
    // Get the todo Object so we can manipulate it later
    let todoObject = nodeTodoLookup(foundContainerNode)

    // Checks what what clicked and then routes that info to the correct function
    let categoryGroup = foundContainerNode.querySelector('.category-group')

    let inputBox = foundContainerNode.querySelector('.inputBox')
    let cancelBtn = inputBox.querySelector('.cancelBtn')
    let confirmBtn = inputBox.querySelector('.confirmBtn')
    let input = inputBox.querySelector('input').value

    let todoBox = foundContainerNode.querySelector('.todoBox')
    let todoText = todoBox.querySelector('span')
    let deleteBtn = todoBox.querySelector('.deleteBtn')
    let editBtn = todoBox.querySelector('.editBtn')

    switch (e.target) {
        case todoText:
            toggleCompletion(todoObject)
            renderDOM()
            break;
        case deleteBtn:
            removeTodo(todoObject)
            renderDOM()
            break;
        case editBtn:
            // Pass to cancel Btn
        case cancelBtn:
            foundContainerNode.classList.toggle('editing')
            break;
        case confirmBtn:
            handleNewInput(todoObject, input)
            // DOM render is in function to prevent empty inputs rerendeing
            break;
        default:
            break;
    }
}
function handleNewInput(todo, inputValue) {
    if (inputValue != "" || inputValue != undefined) {
        todo.todoName = inputValue
        renderDOM()
    }
}
function toggleCompletion(todo) {
    todo.todoStatus = !todo.todoStatus
}
function removeTodo(todo) {
    let todoIndex = todos.indexOf(todo)
    todos.splice(todoIndex, 1)
}

/*
RENDERER
*/
// Renders (Updates) the todos into the DOM
function renderDOM() {
    const todoList = document.querySelector('.todoItemContainer')
    todoList.innerHTML = ""
    let todosLeft = 0

    todos.forEach(todo => {

        function createButton(txt,cls) {
            return `<button class="${cls}">${txt}</button>`
        }
        function createDiv(txt,cls) {
            return `<div class="${cls}">${txt}</div>`
        }

        // Creates the Category Div
        categoryDIV = createDiv((
            createButton(`${todo.todoCategory === null ? "" : todo.todoCategory}`, `${todo.todoCategory === null ? 'category hidden' : 'category'}`)
                +createButton("Change Category", 'change')),
            "category-group")

        // Creates the Main content of the Div
        todoBoxDiv = createDiv(
            `<span class="${!todo.todoStatus ? '' : 'strike'}">${todo.todoName}</span>
                ${createButton("Delete",'deleteBtn')
                +createButton('Edit','editBtn')}`,
            "todoBox")

        // Allows a user to change the todo.todoName and todo.todoCategory of the data.
        inputDiv = createDiv(
            `<input>
                ${createButton("Cancel",'cancelBtn')
                +createButton("Confirm",'confirmBtn')}`
            , "inputBox")
        
        //While I could do what I have been doing before, using the create element seems to allow me to set the dataset without it acting funky
        todoItemContainer = document.createElement('div')
        todoItemContainer.classList.add('todoItem')
        todoItemContainer.dataset.id = todo.todoID
        todoItemContainer.innerHTML = `${categoryDIV + todoBoxDiv + inputDiv}`

        todoList.appendChild(todoItemContainer)

        if (todo.todoStatus) {
            todosLeft ++
        }
    })
    todoList.insertAdjacentHTML("afterbegin", `<h3>Todos Left: <span id="todosLeft">${todosLeft}</span></h3>`)
}
renderDOM()

/*
MASS DELETION OF COMPLETED TODOS
*/
// Deleting completed todos
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

/*
DEBUGGING TOOLS
*/
function debugBtn() {
    console.log(todos)
    console.log(IDcounter)
}