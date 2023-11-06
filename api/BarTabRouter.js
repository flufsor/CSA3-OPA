const { BarTab, DrinkTypes } = require('./BarTab')

const express = require('express')
const router = express.Router()
const axios = require('axios');
const tab = new BarTab()

router.get('/', (req, res) => {
    res.json(tab.Tab)
})


let validateByOpa = (req, res, next) => {
    const url = 'http://opa:8181/v1/data/authz/allow';
    const data = {
        input: {
            attributes: {
                request: {
                    http: {
                        headers: {
                            authorization: req.headers.authorization.split(' ')[1],
                            drinkType: req.params.drinkType
                        }
                    }
                }
            }
        }
    };

    axios.post(url, data)
        .then(response => {
            console.log('Succesvol POST-verzoek:', response.data);
            if (response.data.result == true) {
                next();
            } else {
                console.log("Unauthorized")
                res.status(403).json({ message: "Unauthorized" })
            }
        })
        .catch(error => {
            console.error('Fout bij het uitvoeren van het POST-verzoek:', error);
        });
}

router.get('/add/:drinkType', validateByOpa, (req, res) => {
    if (!(req.params.drinkType in DrinkTypes)) {
        console.log("Invalid drink type: ", req.params.drinkType)
        return res.status(400).json({ message: "Invalid drink type" })
    }

    tab.addDrink(DrinkTypes[req.params.drinkType])
    res.json(tab.Tab)
})

module.exports = router