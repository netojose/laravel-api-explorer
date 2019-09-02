import React, { useEffect, useState, useMemo, useCallback } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import BuildIcon from "@material-ui/icons/Build"

import ModalSetings from "../ModalSetings"
import RoutesList from "../RoutesList"
import RoutePlayground from "../RoutePlayground"

import {
    setCurrentActiveRouteId,
    getCurrentActiveRouteId,
    getGlobalConfig
} from "../../utils/storage"

import { generateRouteId } from "../../utils/hash"

import request from "../../utils/request"

const APPBAR_HEIGHT = "64px"

const useStyles = makeStyles(theme => ({
    appName: {
        flexGrow: 1
    },
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
    const [globalHeaders, setGlobalHeaders] = useState([])
    const [globalVariables, setGlobalVariables] = useState([])
    const [data, setData] = useState({ config: { app_name: null }, routes: [] })
    const [modalSettingsIsOpen, setModalSettingsIsOpen] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState(null)

    useEffect(() => {
        updateSettingsData()
        request.get(window.api_info_url).then(({ data }) => {
            data.routes = data.routes.map(route => ({
                ...route,
                __id: generateRouteId(route)
            }))
            setData(data)
        })
    }, [])

    const updateSettingsData = useCallback(() => {
        setGlobalHeaders(getGlobalConfig("headers"))
        setGlobalVariables(getGlobalConfig("variables"))
    }, [])

    useEffect(() => {
        const routeId = getCurrentActiveRouteId()
        setSelectedRoute(routeId)
    }, [])

    const handleSetRoute = useCallback(routeId => {
        setCurrentActiveRouteId(routeId)
        setSelectedRoute(routeId)
    }, [])

    const openModalSettings = useCallback(
        () => setModalSettingsIsOpen(true),
        []
    )
    const closeModalSettings = useCallback(
        () => setModalSettingsIsOpen(false),
        []
    )

    const currentRoute = useMemo(
        () =>
            !selectedRoute
                ? null
                : data.routes.find(route => route.__id === selectedRoute),
        [selectedRoute, data.routes]
    )

    return (
        <Grid container>
            <ModalSetings
                open={modalSettingsIsOpen}
                onRequestClose={closeModalSettings}
                onUpdateSettings={updateSettingsData}
            />
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.appName}
                    >
                        {data.config.app_name
                            ? `${data.config.app_name} API Explorer`
                            : "Loading..."}
                    </Typography>
                    <IconButton onClick={openModalSettings}>
                        <BuildIcon />
                    </IconButton>
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
                    <RoutePlayground
                        route={currentRoute}
                        globalHeaders={globalHeaders}
                        globalVariables={globalVariables}
                    />
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
