import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import hashSum from "hash-sum"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import RoutesList from "../RoutesList"
import RoutePlayground from "../RoutePlayground"

function App() {
    const [data, setData] = useState({ config: [], routes: [] })
    const [selectedRoute, setSelectedRoute] = useState(null)

    useEffect(() => {
        axios.get(window.api_info_url).then(({ data }) => {
            data.routes = data.routes.map(route => ({
                ...route,
                __id: `route_${hashSum(route)}`
            }))
            setData(data)
        })
    }, [])

    const currentRoute = useMemo(
        () =>
            !selectedRoute
                ? null
                : data.routes.find(route => route.__id === selectedRoute),
        [selectedRoute, data.routes]
    )

    return (
        <Grid container>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Laravel API Explorer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid item md={3}>
                <RoutesList
                    routes={data.routes}
                    selected={selectedRoute}
                    onSelect={setSelectedRoute}
                />
            </Grid>
            <Grid item md={9}>
                <RoutePlayground route={currentRoute} />
            </Grid>
        </Grid>
    )
}

export default App
