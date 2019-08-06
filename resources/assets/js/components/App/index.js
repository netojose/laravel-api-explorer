import React, { useEffect, useState } from "react"
import axios from "axios"

function App() {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get(window.api_info_url).then(response => {
            setData(response.data)
        })
    }, [])
    return (
        <div>
            <p>API Explorer UI</p>
            {data && JSON.stringify(data)}
        </div>
    )
}

export default App
