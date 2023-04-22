const button = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const listCompleted = document.querySelector(".list-task")

let myListItens = []

function addNewTask() {
  myListItens.push({
    task: input.value,
    concluded: false,
  })

  input.value = ""

  tasklist()
}

function tasklist() {
  let newLi = ""
  myListItens.forEach((item, index) => {
    newLi =
      newLi +
      `
        <li class="task ${item.concluded && "done"}">
        <img src="./img/checked.png" alt="checked-na-tarefa" onclick="concludedItem(${index})"/>
            <p>${item.task}</p>
            <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deleteItem(${index})"/>
        </li>
        `
  })

  listCompleted.innerHTML = newLi

  localStorage.setItem("list", JSON.stringify(myListItens))
}

function concludedItem(index) {
  myListItens[index].concluded = !myListItens[index].concluded
  tasklist()
}

function deleteItem(index) {
  myListItens.splice(index, 1)
  tasklist()
}

function recarregarTask() {
  const taskLocalStorage = localStorage.getItem("list")

  if (taskLocalStorage) {
    myListItens = JSON.parse(taskLocalStorage)
  }

  tasklist()
}
recarregarTask()
button.addEventListener("click", addNewTask)
