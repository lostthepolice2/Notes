const button = document.getElementById("button")
const container = document.getElementById("container")
const del = document.getElementById("delete")
const form = document.getElementById("form")
const db = localStorage
let keyTittles = [];
form.addEventListener("submit", (e) =>{
	e.preventDefault()
})

const CreateNewNote = () => {
	const fragment = document.createDocumentFragment()
	const newDiv = document.createElement("div")
	newDiv.setAttribute("class", "content")
	fragment.append(newDiv)
	container.insertBefore(fragment, container.lastElementChild)
	const newInput = document.createElement("input")
	newInput.setAttribute("type", "text")
	newInput.setAttribute("class", "text text-1")
	newInput.setAttribute("placeholder", "Titulo")
	newInput.setAttribute("spellcheck", "true")
	newInput.setAttribute("maxlength", "42")
	newInput.setAttribute("autofocus", "")
	const newTextArea = document.createElement("textarea")
	newTextArea.setAttribute("class", "text text-2")
	newTextArea.setAttribute("placeholder", "Escriba su nota aquí")
	newTextArea.setAttribute("spellcheck", "true")
	newTextArea.setAttribute("cols", "30")
	newTextArea.setAttribute("rows", "10")
	const newSave = document.createElement("button")
	newSave.setAttribute("id","save")
	newSave.setAttribute("class","text button-2")
	newSave.textContent = "Guardar"
	const newDelete = document.createElement("button")
	newDelete.setAttribute("id","delete")
	newDelete.setAttribute("class","text button-1")
	newDelete.textContent = "Eliminar"
	newDiv.append(newInput)
	newDiv.append(newTextArea)
	newDiv.append(newDelete)
	newDiv.append(newSave)
}

button.addEventListener("click",(e)=>{
	e.preventDefault()
	CreateNewNote()
})

addEventListener("click",(e)=>{
	e.preventDefault()
	let isTrue = false;
	let tittles
	if (e.target.id === "save"){
		let note ={
			tittle:e.target.previousElementSibling.previousElementSibling.previousElementSibling.value,
			content:e.target.previousElementSibling.previousElementSibling.value
		}
		/*for (const kTittles of keyTittles) {
			if (note.tittle == kTittles){
				tittles = kTittles
				isTrue = true;
				break;
			}
			}
			if (!isTrue) {*/
			db.setItem(note.tittle.toString(),note.content.toString())
			isTrue=false;
			//}else {
			//	db.setItem(tittles, note.content)
			//}
	}
	if (e.target.id === "delete"){
		let ID = e.target.previousElementSibling.previousElementSibling.value
		
		let apcept = confirm("Esta de Acuerdo");
		if (apcept == true) {
			db.removeItem(ID.toString())
			container.removeChild(e.target.parentElement)
		}
	}
})

window.addEventListener("DOMContentLoaded", (e) =>{
	let repTittle;
	let dataBase = Object.keys(db) 
	e.preventDefault();
	for (const keys in dataBase) {
		let tittle = db.key(keys)
		if(tittle !== repTittle){
			keyTittles.push(tittle)
			repTittle = tittle
		if (tittle !== "" || tittle !== null){
			console.log(tittle)
			let content = db.getItem(tittle)
			container.lastElementChild.previousElementSibling.children[0].value =  tittle
			container.lastElementChild.previousElementSibling.children[1].value = content
			CreateNewNote()
			}
		}	
	}
})	