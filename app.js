const memoInput = document.querySelector('#memo-input');
const mainInput = document.querySelector('#memo-input input')
const memos = document.querySelector('.memos');
const remainingTasks = document.querySelector('#remaining-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const totalTasks = document.querySelector('#total-tasks');

let tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || []

if (localStorage.getItem('tasksArray')) {
    tasksArray.map((task) => {
        createTask(task)
    })
}

memoInput.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = mainInput.value

    if (inputValue == '') {
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    tasksArray.push(task);
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

    createTask(task);
    memoInput.reset();
    mainInput.focus();
})


memos.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-task')) {
        const taskId = e.target.closest('li').id
        console.log(taskId)

        removeTask(taskId);
    }
})


memos.addEventListener('input', (e) => {
    const taskId = e.target.closest('li').id

    completeTask(taskId, e.target)
})


function createTask(task) {
    const taskElement = document.createElement('li');

    taskElement.setAttribute('id', task.id)
    console.log(taskElement.id)

    if (task.isCompleted) {
        taskElement.classList.add('complete')
    }

    const taskElementMarkup = `
    <li id="${task.id}">
        <div>
            <input type="checkbox" name="tasks" ${task.isCompleted ? 'checked' : ''}>
            <span>${task.name}</span>
        </div>
        <button title="Remove the ${task.name}" class="remove-task">
        </button>
    </li>
    `

    taskElement.innerHTML = taskElementMarkup;

    memos.appendChild(taskElement);

    countTasks();
}

function countTasks() {
    const completeTasksArray = tasksArray.filter((task) => (
        task.isCompleted === true
    ))

    totalTasks.textContent = tasksArray.length;
    console.log(completeTasksArray.length)
    completedTasks.textContent = completeTasksArray.length;
    remainingTasks.textContent = tasksArray.length - completeTasksArray.length;
}

function removeTask(taskId) {
    tasksArray = tasksArray.filter((task) => (
        task.id !== parseInt(taskId)
    ))

    console.log(tasksArray)

    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));

    document.getElementById(taskId).remove();

    countTasks();
}

function completeTask(taskId, element) {
    const task = tasksArray.find((task) => task.id === parseInt(taskId))
    const parent = element.closest('li')

    task.isCompleted = !task.isCompleted

    if (task.isCompleted) {
        parent.classList.add('complete')
    } else {
        parent.classList.remove('complete')
    }

    localStorage.setItem('tasksArray', JSON.stringify(tasksArray))

    countTasks()
}