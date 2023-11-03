const { BarTab, DrinkTypes } = require('./BarTab')

const express = require('express')
const router = express.Router()

const tab = new BarTab()

router.get('/', (req, res) => {
    res.json(tab.Tab)
})

router.get('/add/:drinkType', (req, res) => {
    if (!(req.params.drinkType in DrinkTypes)) {
        console.log("Invalid drink type: ", req.params.drinkType)
        return res.status(400).json({ message: "Invalid drink type" })
    }

    tab.addDrink(DrinkTypes[req.params.drinkType])
    res.json(tab.Tab)
})

module.exports = router