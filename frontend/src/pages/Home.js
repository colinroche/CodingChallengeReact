import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {

    // used to save value of fields in form
    const [name, setName] = useState('')
    const [selectData, setSelectData] = useState(null)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            // GET request to the backend server
            await axios.get(`http://localhost:4000/country/${name}`)
            .then(res => {
                setSelectData(res.data)  

            })
            setError('')
        } catch (err) {
            setSelectData(null)
            setError('Country information not found')
        }
    }

    return (
        <div>
            <form  className="countryForm" onSubmit={handleSubmit}>
                <label>Please enter your desired country below:</label>
                {/* saving the inputted variable */}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <button type="submit">Submit</button>
            </form>

            {error && <p>{error}</p>}

            {/* Outputting found data on inputted country */}
            {selectData && (
                <div>
                    <h2>{selectData.name.common}</h2>
                </div>
            )}
        </div>    
    )
}