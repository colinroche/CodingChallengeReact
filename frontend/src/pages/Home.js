import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <form className="countryForm">
                <label>Please enter your desired country below:</label>
                <input type="text"></input>
                <Link to="/countries"><button type="submit">Submit</button></Link>
            </form>
        </div>    
    )
}