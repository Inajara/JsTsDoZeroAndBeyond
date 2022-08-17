/*tema escuro*/
const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme')
})

/*guardar links*/
const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

//carregar e mapear links
async function load() {
    const res = await fetch("http://localhost:5000/")
    .then((data) => data.json())
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()

//guardar endereço na lista
function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

//remover endereço da lista
function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
}

//validação do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let value  = document.getElementById("myTextInputID").value

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })

    input.value = ""
})