import { useState } from "react"
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
                // filter the retrieved countries by exact name
                const matches = res.data.filter(
                    (e) => e.name.common.toLowerCase() === name.toLowerCase()
                )
                
                // name matches exactly
                if (matches.length === 1) {
                    setSelectData(matches[0])
                    setError('')
                }
                // name does not match exactly
                else if (matches.length < 1) {
                    setSelectData(null)
                    setError(<p className="required">Please be more specific. Multiple countries found</p>)
                }
                else {
                    setSelectData(null)
                    setError(<p class="required">Country information not found</p>)
                }
            })
        } catch (err) {
            setSelectData(null)
            setError(<p class="required">Country information not found</p>)
        }
    }

    return (
        <div>
            <form  className="countryForm" onSubmit={handleSubmit}>
                <label>Please enter your desired country below:</label>
                {/* saving the inputted variable */}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <button type="submit">Submit</button>

                {error && <p>{error}</p>}

                {/* Outputting found data on inputted country */}
                {selectData && (
                    <div>
                        <h2>Country Name: {selectData.name.common}</h2>
                    </div>
                )}
            </form> 
        </div>    
    )
}