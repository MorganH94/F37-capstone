const recipes = require('./db.json')
let globalID = 4;


module.exports = {
    getAllRecipes: (req, res) => {
        res.status(200).send(recipes)
    },
    createRecipe: (req, res) => {
        const {recipeTitle, recipeLink, rating, imageURL} = req.body;
        
        let newRecipe = {
            recipeTitle: recipeTitle, 
            recipeLink: recipeLink, 
            rating: +rating,
            imageURL, 
            id: globalID
        }

        recipes.push(newRecipe)
        globalID++; 
        res.status(200).send(recipes)
    },
    deleteRecipe: (req, res) => {
        const {id} = req.params;
        let index = recipes.findIndex((elem) => elem.id === +id)
        recipes.splice(index, 1)
        res.status(200).send(recipes)
    },
    updateRecipe: (req, res) => {
        const {type} = req.body;
        let index = recipes.findIndex((elem) => elem.id === +req.params.id)
        if(type === 'minus' && recipes[index]. rating > 1){
            recipes[index].rating -= 1;
            res.status(200).send(recipes)
        } else if(type === 'plus' && recipes[index].rating < 5){
            recipes[index].rating += 1;
            res.status(200).send(recipes)
        } else {
            res.status(400).send('Invalid star rating!')
        }
    }
}
