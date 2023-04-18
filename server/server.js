const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getAllRecipes, createRecipe, deleteRecipe, updateRecipe} = require('./controller')


app.get('/api/recipes', getAllRecipes)
app.post('/api/recipes', createRecipe)
app.put('/api/recipes/:id', updateRecipe)
app.delete('/api/recipes/:id', deleteRecipe)

app.listen(4004, () => console.log('Ready to rock n roll on port 4004!'))

