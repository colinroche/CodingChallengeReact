const express = require('express')
const cors = require('cors')
const router = require('./routes/router')

const app = express()
const PORT = 4000

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})