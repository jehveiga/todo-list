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
        li.className = "todo-item"
        const paragrafo = document.createElement("p")
        paragrafo.className = "task-name"
        paragrafo.textContent = obj.name
        li.appendChild(paragrafo)
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