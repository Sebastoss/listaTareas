const h1 = document.querySelector("h1");
const tituloEditar = document.querySelector(".editarTitulo");

const input = document.querySelectorAll("input");
const inputTitulo = document.getElementById("inputTitulo");
const textArea = document.getElementById("textAreaDesc");
const selectPrioridad = document.querySelector("select"); 

const addBtn = document.querySelector(".btn-add");

const ulTareas = document.querySelector("#ulTareas");
const ulProceso = document.querySelector("#ulProceso");
const ulFinalizada = document.querySelector("#ulFinalizada");

const empty  = document.querySelector(".empty");

const abrirModal = document.querySelector("#abrirModal");
const modalTareas = document.querySelector("#modal-tareas");

const containerTarea = document.querySelector("#container-tarea");
const containerProceso = document.querySelector("#container-proceso");
const containerFinalizada = document.querySelector("#container-finalizada");

const colorAltaPrioridad = "#ff9999";
const colorMediaPrioridad = "#fff5b5"
const colorBajaPrioridad = "lightgrey"

const arrayTareas = [];
let dataSetId = 0;

const ocultarModal = ()=>{
    if(modalTareas.classList[0] === "ocultar"){
        modalTareas.classList.remove("ocultar");
        abrirModal.textContent = "Cerrar"
    } else {
        modalTareas.classList.add("ocultar")
        abrirModal.textContent = "Añadir"
        selectPrioridad.value = "baja"
    }
}

const colorPrioridad = (prioridad, li)=>{
    switch(prioridad){
        case "alta":
            li.style.backgroundColor = colorAltaPrioridad;
            break;
        case "media":
            li.style.backgroundColor = colorMediaPrioridad;
            break;
        case "baja":
            li.style.backgroundColor = colorBajaPrioridad;
            break;
    }
}

abrirModal.addEventListener("click",()=>{
    ocultarModal();
    inputTitulo.focus();
})




/*tituloEditar.addEventListener("click", () => {
    const tituloTarea = h1.textContent;
    h1.textContent = prompt("Ingresa un título para tu lista de tareas");
    if (h1.textContent === ""){
        h1.textContent = tituloTarea;
        return  
    }

})*/

//Evento de click del botón Añadir Tarea

addBtn.addEventListener("click", (e) => {

    e.preventDefault();
    


    const titulo = input[0].value;
    const text = textArea.value.replaceAll(`\n`, `<br>`);
    const prioridad = selectPrioridad.value

    if(text !== ""){

        dataSetId += 1;

        arrayTareas.push({
            "titulo": titulo,
            "descripcion": text,
            "id": dataSetId,
            "estado": "pendiente",
            "prioridad": prioridad
        })

        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");

        li.dataset.id = dataSetId;

        colorPrioridad(prioridad, li)

        h3.textContent = titulo;
        p.innerHTML = text;

        li.appendChild(h3);
        li.appendChild(p);
        ulTareas.appendChild(li);
        li.appendChild(addDeleteBtn());
        li.appendChild(addProceso());
        
        //li.appendChild(addFinalizada());
    

        input[0].value = "";
        textArea.value = "";
        empty.style.display = "none";
        containerTarea.classList.remove("ocultar");

    }

    console.log(arrayTareas)
    ocultarModal();
});

function tareasPendientes(){

    if(arrayTareas.every(tarea => tarea.estado === "eliminada")){
        empty.style.display = "block";
        console.log(true)
    } else {
        empty.style.display = "none";
        console.log(false)
    }
}

// Modifica el estado de la tarea en el arrayTareas a proceso, eliminada o finalizada
// Hace removeChild de los li que se encuentran dentro de los ul de cada estado (ulTareas, ulProceso y ulFinalizada) 
function estadoTarea(data, item, estado){

    arrayTareas.findLastIndex((objeto, indice)=>{

        if(objeto.id === data){
            switch(estado){
                case "eliminada":
                    arrayTareas[indice].estado = "eliminada";
                    break;

                case "proceso":
                    arrayTareas[indice].estado = "proceso"; 

                    break;

                case "finalizada":
                    arrayTareas[indice].estado = "finalizada";
                    if(item.parentElement === ulProceso){
                        //item.childNodes[3].classList.add("ocultar");
                        console.log(item.childNodes)

                    }
                    break;
            }

            console.log(arrayTareas)
        }
    })

    if(item.parentElement.id === "ulTareas"){
        ulTareas.removeChild(item);
        ocultarContainers(containerTarea);
        tareasPendientes()
    }

    else if(item.parentElement.id === "ulProceso"){
        ulProceso.removeChild(item);
        ocultarContainers(containerProceso);
        tareasPendientes()
    }

    else if(item.parentElement.id === "ulFinalizada"){
        ulFinalizada.removeChild(item);
        ocultarContainers(containerFinalizada);
        tareasPendientes()
        
    }
}

function ocultarContainers(container){
    if (container.childNodes[3].childElementCount === 0){
        container.classList.add("ocultar");
    }
}

function addDeleteBtn(){
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar -";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        
        const item = e.target.parentElement; // selecciona el target parentElement (el li del boton delete)
        const dataId = +item.dataset.id; // data-id del target li

        console.log(item.parentElement.id) // ulTareas

        estadoTarea(dataId,item,"eliminada")

    });

    return deleteBtn;
}


function addProceso(){
    const procesoBtn = document.createElement("button");
    procesoBtn.textContent = "Comenzar tarea +";
    procesoBtn.className = "btn-addProceso";

    procesoBtn.addEventListener("click", (e) =>{

        const item = e.target.parentElement;
        const dataId = +item.dataset.id;

        estadoTarea(dataId,item,"proceso")

        ulProceso.appendChild(item);

        if(ulProceso.lastChild.childNodes[3].classList[0] === "btn-addProceso"){
            // Elimino el boton comenzar tarea
            ulProceso.lastChild.removeChild(ulProceso.lastChild.childNodes[3])
            // Añado el boton de finalizar tarea
            ulProceso.lastChild.appendChild(addFinalizada());
        }

        containerProceso.classList.remove("ocultar");
        ocultarContainers(containerTarea);

    })

    return procesoBtn;
}

function addFinalizada(){
    const finalizadaBtn = document.createElement("button");
    finalizadaBtn.textContent = "Finalizar ✔";
    finalizadaBtn.className = "btn-addFinalizada";

    finalizadaBtn.addEventListener("click", (e) =>{

        const item = e.target.parentElement;
        const dataId = +item.dataset.id;

        estadoTarea(dataId,item,"finalizada")

        ulFinalizada.appendChild(item);

        if(ulFinalizada.lastChild.childNodes[3].classList[0] === "btn-addFinalizada"){

            // Elimino el boton finalizada
            ulFinalizada.lastChild.removeChild(ulFinalizada.lastChild.childNodes[3])
        }

        containerFinalizada.classList.remove("ocultar");
        ocultarContainers(containerFinalizada);

    })

    return finalizadaBtn;
}