const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/countries', async (req, res) => {
    const name = req.params.name;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`)
        const selectData = response.data

        res.status(200).json(selectData)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve country names'})
    }
})

router.get('/countries/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        const selectData = response.data

        res.status(200).json(selectData)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve country information'})
    }
})
module.exports = router