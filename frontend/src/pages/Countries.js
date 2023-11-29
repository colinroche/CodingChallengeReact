import { useContext } from "react"
import Context from "../components/Context"

export default function Countries() {
    const countryData = useContext(Context)
    return (
        <div>
            <p>Countries</p>
            <p>Country test name: {countryData.name}</p>
        </div>
    )
}