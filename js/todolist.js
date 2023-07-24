;(function (){
    "use strict"

    // ARMAZENAR O DOM EM VARIAVEIS
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ulTodoList = document.getElementById("todo-list")
    //const lisTodoList = document.getElementsByTagName("li")

    let arrTasks = [
        {
            name: "task 1",
            createAt: Date.now(),
            completed: false,
        },
        {
            name: "task 2",
            createAt: Date.now(),
            completed: false,
        }
    ]

    // Função responsável por adicionar um evento de escuta de click no elemento li passado por parametro
    function addEventList(li) {
        li.addEventListener("click",function () {
            console.log(this)

        })
    }

    // Função responsável por criar o elemento li e paragrafo e adicionar os dados do objeto recebido por parametro no paragrafo
    function generateLiTask(obj){
        const li = document.createElement("li")
        const paragrafo = document.createElement("p")
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deleteButton = document.createElement("i")

        li.className = "todo-item"

        checkButton.className = "button-check"
        checkButton.innerHTML = `<i class="fas fa-check displayNone"></i>`

        li.appendChild(checkButton)

        paragrafo.className = "task-name"
        paragrafo.textContent = obj.name
        li.appendChild(paragrafo)

        editButton.className = "fas fa-edit"
        li.appendChild(editButton)

        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"
        const inputEdit = document.createElement("input")
        inputEdit.type = "text"
        inputEdit.className = "editInput"
        containerEdit.appendChild(inputEdit)

        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEdit.appendChild(containerEditButton)

        const containerCancelButton = document.createElement("button")
        containerCancelButton.className = "cancelButton"
        containerCancelButton.textContent = "Cancel"
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)
        

        // Pode ser usado className ou classList
        deleteButton.classList.add("fas", "fa-trash-alt") //Adiciona as classes separadamente em cada parametro
        li.appendChild(deleteButton)

        addEventList(li)

        return li
    }

    // Função responsavel por limpar a ul e adicionar a renderização dos dados na ul list atualizando o HTML da página
    // adicionando a li retornado da função generateLiTask()
    function renderTasks(){
        ulTodoList.innerHTML = ""
        arrTasks.forEach(taskObj => {
            ulTodoList.appendChild(generateLiTask(taskObj))
        });
    }

    // Função responsavel por adicionar no array de objetos a task passada no input
    function addTasks(task) {
        arrTasks.push({
            name: task,
            createAt: Date.now(),
            completed: false,
        })
    }

    // Adicionando a escuta do evento de submit para adicionar a To do criada na ul
    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(itemInput.value)
        // ulTodoList.innerHTML += `                 
        //     <li class="todo-item">
        //         <p class="task-name">${itemInput.value}</p>
        //     </li>
        // `
        addTasks(itemInput.value)
        renderTasks()

        itemInput.value = "";
        itemInput.focus()
    });

    renderTasks()

})();