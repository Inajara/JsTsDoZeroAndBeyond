const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')
const data = require('./url.json')

function criadorDeDados(callBack) {
    fs.writeFile(
        path.join(__dirname, './url.json'), 
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err
            callBack(JSON.stringify({message: "sucesso"}))
        }
    )
}

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query
    //permissão de acesso do front
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    //listar dados criados
    if(!name || !url) return res.end(JSON.stringify(data))
    //deletar dados
    if(del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return criadorDeDados((message) => {res.end(message)})
    }
    //criar novos dados
    data.urls.push({ name, url })
    return criadorDeDados((message) => {res.end(message)})
}).listen(5000, () => console.log("Api rodando corretamente..."))