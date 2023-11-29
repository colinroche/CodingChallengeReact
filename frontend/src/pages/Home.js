export default function Home() {
    return (
        <div>
            <form className="countryForm">
                <label>Please enter your desired country below:</label>
                <input type="text"></input>

                <button type="submit">Submit</button>
            </form>
        </div>    
    )
}