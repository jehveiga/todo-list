;(function (){
    "use strict"

    // ARMAZENAR O DOM EM VARIAVEIS - usando getElements toda alteração nos elementos atribuidos será refletido nos elementos obtidos
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ulTodoList = document.getElementById("todo-list")
    const lisTodoList = document.getElementsByTagName("li")

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
    // function addEventList(li) {
    //     li.addEventListener("click",function () {
    //         console.log(this)

    //     })
    // }

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
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(checkButton)

        paragrafo.className = "task-name"
        paragrafo.textContent = obj.name
        li.appendChild(paragrafo)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)

        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"
        const inputEdit = document.createElement("input")
        inputEdit.type = "text"
        inputEdit.className = "editInput"
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)

        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "containerEditButton")
        containerEdit.appendChild(containerEditButton)

        const containerCancelButton = document.createElement("button")
        containerCancelButton.className = "cancelButton"
        containerCancelButton.textContent = "Cancel"
        containerCancelButton.setAttribute("data-action", "containerCancelButton")
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)
        

        // Pode ser usado className ou classList
        deleteButton.classList.add("fas", "fa-trash-alt") //Adiciona as classes separadamente em cada parametro

        // Adicionando atributos para separar cada evento de delegação de evento
        deleteButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deleteButton)

        //addEventList(li)

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

    function clickedUlTodoList(e){
        const dataAction = e.target.getAttribute("data-action")
        if(!dataAction) return 

        // Adicionando algoritmo para obter o Pai do elemento no caso a "LI" pai dos elementos da TodoList,
        // atribuindo o elemento pai na varíavel até chegar na LI
        let currentLi = e.target
        while(currentLi.nodeName !=="LI"){
            currentLi = currentLi.parentNode
        }
        // Obter o indice da li da tarefa selecionada que tenha um atributo data-action
        const currentLiIndex = [...lisTodoList].indexOf(currentLi)

        // Usando Objetos para adicionar funcões na constante criada
        const actions ={
            editButton: function(){
                const editContainer = currentLi.querySelector(".editContainer");
                [...ulTodoList.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });
                editContainer.style.display = "flex";
            },
            deleteButton: function(){
                arrTasks.splice(currentLiIndex, 1)
                console.log(arrTasks)
                renderTasks()
            },
            containerEditButton: function(){
                const valueInputTask = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = valueInputTask
                renderTasks()
            }, 
            containerCancelButton: function(){
                currentLi.querySelector(".editContainer").removeAttribute("style")

                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name
            }
        } 

        if(actions[dataAction]){
            actions[dataAction]()
        }
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

    ulTodoList.addEventListener("click", clickedUlTodoList)

    renderTasks()

})();