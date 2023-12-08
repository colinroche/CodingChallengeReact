import { useState , useEffect} from "react"
import axios from "axios"

export default function Home() {

    // used to save value of fields in form
    const [name, setName] = useState('')
    const [selectData, setSelectData] = useState(null)
    const [countriesData, setCountriesData] = useState([])
    const [countriesValue, setCountriesValue] = useState('')
    const [error, setError] = useState('')

    const [filteredCountries, setFilteredCountries] = useState([])

    // when application runs, it processes this first
    useEffect(() => {
        // ensures that it only runs once at the beginning
        let processing = true
        countriesFetchData(processing)
        return () => {
            processing = false
        }
    }, [])

    useEffect(() => {
        // Set initial filtered countries when component mounts
        setFilteredCountries(countriesData)

        // Update filtered countries when countriesData changes
        return () => {
            setFilteredCountries(countriesData)
        }
    }, [countriesData])

    // GET request to the backend server for information on all countries
    const countriesFetchData = async (processing) => {
        try {
            const response = await axios.get('https://coding-challenge-react-backend.vercel.app/countries')
            
            if (processing) {
                setCountriesData(response.data)
            }
        } catch (error) {
            setCountriesData([])
            setError('Country information not found')
        }
    }

    const handleChange = (e) => {
        // capitalizing the first letter inputted
        const formatValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        setName(formatValue)
        setCountriesValue(formatValue)
    }

    const setSelectedCountryInfo = (countryName) => {
        const country = countriesData.find((item) => item.name.common === countryName)

        if (country) {
            setSelectData(country)
            setError('')
        } else {
            setSelectData(null)
            setError('Country information not found')
        }
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase()
        setName(e.target.value) // Save input value

        // Filter countries based on input
        const filtered = countriesData.filter((country) =>
            country.name.common.toLowerCase().includes(inputValue)
        )

        setFilteredCountries(filtered);// Update filtered countries
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        setSelectedCountryInfo(name)
        try {
            // GET request to the backend server for information on specific country
            const response = await axios.get(`https://coding-challenge-react-backend.vercel.app/countries/${name}`)
            // filter the retrieved countries by exact name
            const matches = response.data.filter(
                (country) => country.name.common.toLowerCase() === name.toLowerCase()
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
        } catch (err) {
            setSelectData(null)
            setError('Country information not found')
        }
    }

    const checkIndependents = (independent) => {
        return independent ? 'Independent' : 'Not independent'
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
                {/* saving the inputted variable */}
                <input type="text" value={name} placeholder="Please enter your desired country..." onChange={handleInputChange} />

                <div className="filtered-select">
                    {filteredCountries.length > 0 ? (
                        <select value={countriesValue} onChange={handleChange}>
                            {filteredCountries.map((country) => (
                                <option value={country.name.common} key={country.name.common}>
                                    {country.name.common}
                                </option>
                            ))}
                        </select>
                    ) : (
                            <p>No matching countries found</p>
                    )}
                </div>

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