;(function (){
    "use strict"

    // ARMAZENAR O DOM EM VARIAVEIS
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ulTodoList = document.getElementById("todo-list")
    const lisTodoList = document.getElementsByTagName("li")

    function addEventList(li) {
        li.addEventListener("click",function () {
            console.log(this)
            console.log(this.textContent)
            console.log(this.innerText)
            console.log(this.innerHTML)
            console.log(this.outerHTML)
        })
    }

    function addTasks(task) {
        const li = document.createElement("li")
        li.className = "todo-item"
        const paragrafo = document.createElement("p")
        paragrafo.className = "task-name"
        paragrafo.textContent = task
        li.appendChild(paragrafo)
        ulTodoList.appendChild(li)

        addEventList(li)
    }


    // Adicionando a escuta do evento de submit para adicionar a Todo criada na ul
    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(itemInput.value)
        // ulTodoList.innerHTML += `                 
        //     <li class="todo-item">
        //         <p class="task-name">${itemInput.value}</p>
        //     </li>
        // `
        addTasks(itemInput.value)
        itemInput.value = "";
        itemInput.focus()
    });

    [...lisTodoList].forEach(li => {
        addEventList(li)
    });

})();