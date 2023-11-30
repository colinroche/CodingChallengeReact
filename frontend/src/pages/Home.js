import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Home() {

    // used to save value of fields in form
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [selectData, setSelectData] = useState([])
    const [selectValue, setSelectValue] = useState('')

    // when application runs, it processes this first
    useEffect(() => {
        // ensures that it only runs once at the beginning
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[])

    // GET request to pull in API directly for testing
    const axiosFetchData = async (processing) => {
        await axios.get('http://localhost:4000')
        .then(res => {
            if (processing) {
                setSelectData(res.data)    
            }
        })
        .catch(err => console.log(err))
    }

    // A dropdown list of the common names present in API for testing
    const SelectDropdown = () => {
        return (
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                {
                    selectData?.map((item) => (
                        <option value={item.name.common} key={item.name}>{item.name.common}</option>
                    ))
                }
            </select>
        )
    }

    // prevent default action of submit for testing
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(name + ' | ' + selectValue)

        // error handling to see if text has been input - test
        if (!name) {
            setError(<p className="required">Country name is empty</p>)
        }
        else {
            setError('')
        }
    }

    return (
        <div>
            <form className="countryForm">
                <label>Please enter your desired country below:</label>
                {/* saving the inputted variable */}
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                
                <SelectDropdown />

                {error}

                <Link to="/countries"><button type="submit" onClick={handleSubmit}>Submit</button></Link>
            </form>
        </div>    
    )
}