const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`)
        const countryData = response.data

        res.status(200).json(countryData)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve country information'})
    }
})
module.exports = router