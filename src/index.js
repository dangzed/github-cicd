const express = require('express')
const bodyParser = require('body-parser')
const merge = require('merge-recursive')
const app = express()
const execSync = require('child_process').execSync
const port = 8080
const host = '0.0.0.0'

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let commands = {'Show current directory': 'pwd', 'List directory content': 'ls', 'Server owner': 'whoami', 'Display hostname': 'hostname'}
let users = {'trungnh': 'Nguyen Huu Trung', 'chauhm': 'Ha Minh Chau', 'huynv': 'Nguyen Van Huy', 'sonnth': 'Nguyen Trung Huy Son'}

app.get('/', (req, res) => {

    res.render('index', {'name': 'Vu Hai Dang'})
});

app.get('/commands/list', (req, res) =>
    res.render('commands', {
        'commands': commands
    })
)

app.get('/commands/executeAll', (req, res) => {
    let results = []
    for (var scriptName in commands) {
        try {
            results.push(execSync(commands[scriptName], {encoding: 'utf-8'}))
        } catch {
            results.push('Cannot execute your command')
        } 

    }
    res.render('results', {
        'results': results
    })
})

app.get('/users/list', (req, res) =>
    res.render('users', {
        'users': users
    })
)

app.post('/users/create', (req, res) => {
    let reqObj = ''
    try{
        JSON.parse(req.body.fullname)
        reqObj = '{"' + req.body.nickname + '": ' + req.body.fullname + '}'
    }
    catch {
        reqObj = '{"' + req.body.nickname + '": "' + req.body.fullname + '"}'
    }
    if(!commands.hasOwnProperty(req.body.nickname))
        users = merge.recursive(users, JSON.parse(reqObj))
    res.redirect('/users/list')
})

app.get('/users/create', (req, res) => {
    res.render('create')
})

app.get('/users/search', (req, res) => {
    let q = req.query.q
    let matchedUsers = {}
    for (key in users)
        if (key.indexOf(q) !== -1 || users[key].indexOf(q) !== -1)
            matchedUsers[key] = users[key]
    res.render('users', {
        'users': matchedUsers
    })
})

app.listen(port, host);
console.log('Running');