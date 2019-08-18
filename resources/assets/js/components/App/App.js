import React, { useEffect, useState, useMemo, useCallback } from "react"
import axios from "axios"
import hashSum from "hash-sum"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import RoutesList from "../RoutesList"
import RoutePlayground from "../RoutePlayground"

import {
    setCurrentActiveRouteId,
    getCurrentActiveRouteId
} from "../../utils/storage"

const APPBAR_HEIGHT = "64px"

const useStyles = makeStyles(theme => ({
    playground: {
        backgroundColor: theme.palette.background.default
    },
    grid: {
        height: `calc(100vh - ${APPBAR_HEIGHT})`
    },
    paper: {
        padding: theme.spacing(3, 2),
        textAlign: "center"
    }
}))

function App() {
    const classes = useStyles()
    const [data, setData] = useState({ config: { app_name: null }, routes: [] })
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

    useEffect(() => {
        const routeId = getCurrentActiveRouteId()
        setSelectedRoute(routeId)
    }, [])

    const handleSetRoute = useCallback(routeId => {
        setCurrentActiveRouteId(routeId)
        setSelectedRoute(routeId)
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
                        {data.config.app_name
                            ? `${data.config.app_name} API Explorer`
                            : "Loading..."}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid item md={3}>
                <RoutesList
                    routes={data.routes}
                    selected={selectedRoute}
                    onSelect={handleSetRoute}
                />
            </Grid>
            <Grid item md={9} className={classes.playground}>
                {currentRoute ? (
                    <RoutePlayground route={currentRoute} />
                ) : (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.grid}
                    >
                        <Grid>
                            <Box width={300}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h5" component="h3">
                                        No route selected.
                                    </Typography>
                                    <Typography component="p">
                                        Select a route on the list.
                                    </Typography>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default App
