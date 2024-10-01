const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

let produtos = [
    {
        id: uuidv4(),
        nome: "The Last of Us Part II",
        genero: "Ação/Aventura",
        plataforma: ["PS4"],
        lancamento: 2020
    },
    {
        id: uuidv4(),
        nome: "God of War",
        genero: "Ação/Aventura",
        plataforma: ["PS4", "PC"],
        lancamento: 2018
    },
    {
        id: uuidv4(),
        nome: "The Legend of Zelda: Breath of the Wild",
        genero: "Aventura",
        plataforma: ["Switch"],
        lancamento: 2017
    },
    {
        id: uuidv4(),
        nome: "Minecraft",
        genero: "Sandbox",
        plataforma: ["PC", "Console", "Mobile"],
        lancamento: 2011
    },
    {
        id: uuidv4(),
        nome: "Cyberpunk 2077",
        genero: "RPG",
        plataforma: ["PC", "PS4", "Xbox"],
        lancamento: 2020
    },
    { 
        id: uuidv4(), 
        nome: "Red Dead Redemption 2", 
        genero: "Ação/Aventura", 
        plataforma: ["PS4", "Xbox", "PC"], 
        lancamento: 2018 
    },
    { 
        id: uuidv4(), 
        nome: "Assassin's Creed Valhalla", 
        genero: "Ação/Aventura", 
        plataforma: ["PS4", "PS5", "Xbox", "PC"], 
        lancamento: 2020 
    },
    { 
        id: uuidv4(), 
        nome: "Among Us", 
        genero: "Multiplayer", 
        plataforma: ["PC", "Mobile", "Switch"], 
        lancamento: 2018 
    },
    { 
        id: uuidv4(), 
        nome: "Fortnite", 
        genero: "Battle Royale", 
        plataforma: ["PC", "Console", "Mobile"], 
        lancamento: 2017 
    },
    { 
        id: uuidv4(), 
        nome: "Genshin Impact", 
        genero: "RPG de Ação", 
        plataforma: ["PC", "PS4", "Mobile"], 
        lancamento: 2020 
    },
    { 
        id: uuidv4(), 
        nome: "Doom Eternal", 
        genero: "FPS", 
        plataforma: ["PC", "PS4", "Xbox"], 
        lancamento: 2020 
    },
    { 
        id: uuidv4(), 
        nome: "Stardew Valley", 
        genero: "Simulação", 
        plataforma: ["PC", "Console", "Mobile"], 
        lancamento: 2016 
    },
    { 
        id: uuidv4(), 
        nome: "Hades", 
        genero: "Roguelike", 
        plataforma: ["PC", "Switch"], 
        lancamento: 2020 
    },
    { 
        id: uuidv4(), 
        nome: "Sekiro: Shadows Die Twice", 
        genero: "Ação/Aventura", 
        plataforma: ["PC", "PS4", "Xbox"], 
        lancamento: 2019 
    },
    { 
        id: uuidv4(), 
        nome: "Overwatch", 
        genero: "FPS", 
        plataforma: ["PC", "Console"], 
        lancamento: 2016 
    }
]

app.use(express.json());
const autenticacao = (req, res, next) => {
    const token = req.headers.token
    if (!token) res.status(401).send('Token inválido')
    next()
}

const validacao = (req, res, next) => {
    //nome
    if(!req.body.nome) return res.status(400).send('Campo nome é obrigatório')
    if(!(typeof req.body.nome === 'string')) return res.status(400).send('Campo nome precisa ser uma String')

    //genero
    if(!req.body.genero) return res.status(400).send('Campo genero é obrigatório')
    if(!(typeof req.body.genero === 'string')) return res.status(400).send('Campo genero precisa ser uma String')
    

    //plataforma
    if(!req.body.plataforma) return res.status(400).send('Campo plataforma é obrigatório')
    if(!(typeof req.body.plataforma === 'object')) return res.status(400).send('Campo plataforma precisa ser um Array')
    if(req.body.plataforma.length == 0) return res.status(400).send('É necessário pelo menos uma plataforma')
    for(let plataforma of req.body.plataforma){
        if(!(typeof plataforma === 'string')) return res.status(400).send('Nome da plataforma precisa ser um String')
    }
    
    //lancamento
    if(!req.body.lancamento) return res.status(400).send('Campo lancamento é obrigatório')
    if(!(typeof req.body.lancamento === 'number')) return res.status(400).send('Campo nome precisa ser Number')

    next()
}

app.use((err, req, res, next) => {
    
    next()
    
    console.error(err.stack)
    
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Erro interno do servidor',
      },
    })
})

app.get('/usuarios/:nome', autenticacao, (req, res, next) => {
    const nome = req.params.nome
    res.send(`Olá, ${nome}!`)
})

app.get('/produtos', (req, res, next) => {
    const lancamento = req.query.lancamento
    console.log(lancamento)
    const produtosFiltrados = produtos.filter(produto => produto.lancamento == lancamento)
    res.status(200).json(produtosFiltrados)
})

app.post('/produtos', validacao, (req, res, next) => {

    let produto = req.body
    produtos.push({
        id: uuidv4(), 
        nome: produto.nome, 
        genero: produto.genero, 
        plataforma: produto.plataforma, 
        lancamento: produto.lancamento 
    })
    res.status(201).send('produto cadastrado com sucesso!')
})
app.listen(3000)