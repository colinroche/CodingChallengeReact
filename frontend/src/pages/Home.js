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
            await axios.get(`https://coding-challenge-react-backend.vercel.app/country/${name}`)
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
                    setError('Please be more specific. Multiple countries found')
                }
                else {
                    setSelectData(null)
                    setError('Country information not found')
                }
            })
        } catch (err) {
            setSelectData(null)
            setError('Country information not found')
        }
    }

    const checkIndependents = (independent) => {
        if (independent === true) {
            return('Independent')
        } 
        else {
            return('Not independent')
        }
    }

    // function used when specified data from api has multiple varying outputs
    const renderMultiple = (data, isCurrency = false) => {
        return (
            <div>
                {/* Display multiple currencies if available */}
                {typeof data === 'object' ? (
                    Object.keys(data).map((code) => (
                        <li key={code}>
                            {/* Checks if the output is for currency as it has multiple output*/}
                            {isCurrency ? (
                                // if different type of nested data, could be check here!
                                currencyOutput(data, code)
                            ) : (
                                // if not currency print output
                                data[code]
                            )}
                        </li>
                    ))
                ) : (
                    // Converting into a JSON variable before rendering if it is not an object
                    <li>{JSON.stringify(data)}</li>
                )}
            </div>
        )
    }

    const currencyOutput = (data, code) => {
        return (
            <div>
                <strong>Name:</strong> {data[code].name}<br />
                <strong>Symbol:</strong> {data[code].symbol}
            </div>
        )
    }

    return (
        <div>
            <form  className="countryForm" onSubmit={handleSubmit}>
                <label>Please enter your desired country below:</label>
                {/* saving the inputted variable */}
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <button type="submit">Country Details</button>

                {error && <p class="required">{error}</p>}

                {/* Outputting found data on inputted country */}
                {selectData && (
                    <div>
                        <h2>Official Name: <span>{selectData.name.official}</span></h2>
                        <h2>Common Name: <span>{selectData.name.common}</span></h2>
                        <h2>Capital: <span>{selectData.capital}</span></h2>
                        <h2>Region: <span>{selectData.region}</span></h2>
                        <h2>Population: <span>{selectData.population}</span></h2>
                        <h2>Status: <span>{checkIndependents(selectData.independent)}</span></h2>
                        <h2>Flag: <span>{selectData.flag}</span></h2>
                        <h2>Languages: <span>{renderMultiple(selectData.languages)}</span></h2>
                        <h2>Currencies: <span>{renderMultiple(selectData.currencies, true)}</span></h2>
                    </div>
                )}
            </form> 
        </div>    
    )
}