const h1 = document.querySelector("h1");
const tituloEditar = document.querySelector(".editarTitulo");
const input = document.querySelector("input");
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

const ocultarModal = ()=>{
    if(modalTareas.classList[0] === "ocultar"){
        modalTareas.classList.remove("ocultar");  
    } else {
        modalTareas.classList.add("ocultar")
    }
}

abrirModal.addEventListener("click",()=>{
    ocultarModal();
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
    
    const text = input.value;

    if(text !== ""){

        const li = document.createElement("li");
        const p = document.createElement("p");

        p.textContent = text;

        li.appendChild(p);
        ulTareas.appendChild(li);
        li.appendChild(addDeleteBtn());
        li.appendChild(addProceso());
        li.appendChild(addFinalizada());
    
        
        for(let i = 0; i < ulTareas.childNodes.length; i++){
        ulTareas.childNodes[i].childNodes[3].classList.add("ocultar")
        }

        

        input.value = "";
        empty.style.display = "none";
        containerTarea.classList.remove("ocultar");

    }
    ocultarModal();
});


function addDeleteBtn(){
    const deleteBtn = document.createElement("button");
    
    deleteBtn.textContent = "-";

    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {

        const elemento = e.target.parentElement;
        if(elemento.parentElement.id === "ulTareas"){
            console.log(elemento.parentElement.id)
            ulTareas.removeChild(elemento);
            
        }

        else if(elemento.parentElement.id === "ulProceso"){
            ulProceso.removeChild(elemento)
            if(ulProceso.childNodes.length === 0){
                containerProceso.classList.add("ocultar");
            }
        }

        else if(elemento.parentElement.id === "ulFinalizada"){
            ulFinalizada.removeChild(elemento)
            if(ulFinalizada.childNodes.length === 0){
                containerFinalizada.classList.add("ocultar");
            }
        }

       
        const elementos = document.querySelectorAll("li");

        if(elementos.length === 0){
            empty.style.display = "block";
            containerTarea.classList.add("ocultar")
            
        }
    });
    

    return deleteBtn;

}

function addProceso(){
    const procesoBtn = document.createElement("button");
    
    procesoBtn.textContent = "+";
    procesoBtn.className = "btn-addProceso";

    procesoBtn.addEventListener("click", (e) => {

        const item = e.target.parentElement;
        console.log(item)
        ulProceso.appendChild(item);
        if(ulTareas.childNodes.length === 0){
            containerTarea.classList.add("ocultar");
        }

        const itemList = document.querySelectorAll("li");

        
        if(itemList.length > 0){
            console.log(itemList)
            procesoBtn.classList.add("ocultar");
            containerProceso.classList.remove("ocultar");

            for(let i = 0; i < ulProceso.childNodes.length; i++){
                ulProceso.childNodes[i].childNodes[3].classList.remove("ocultar")
            }
        }




    });

    return procesoBtn;
}


function addFinalizada(){
    const finalizadaBtn = document.createElement("button");
    
    finalizadaBtn.textContent = "+";
    finalizadaBtn.className = "btn-addFinalizada";

    
    finalizadaBtn.addEventListener("click", (e) => {

        const item = e.target.parentElement;
        ulFinalizada.appendChild(item);

        if(ulFinalizada.childNodes.length === 0){
            containerFinalizada.classList.add("ocultar");
        }

        if(ulProceso.childNodes.length === 0){
                containerProceso.classList.add("ocultar");
        }

        const itemList = document.querySelectorAll("li");
        if(itemList.length > 0){
            finalizadaBtn.classList.add("ocultar");
            containerFinalizada.classList.remove("ocultar");  
        }
        
    });

    return finalizadaBtn;
}
