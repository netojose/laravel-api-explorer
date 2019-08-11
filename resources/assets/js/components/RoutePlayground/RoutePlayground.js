import React, { useState, useEffect, useCallback, Fragment } from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"

import ChipHttpVerb from "../ChipHttpVerb"
import DrawerRoute from "./DrawerRoute"
import RequestArea from "./RequestArea"
import ResponseArea from "./ResponseArea"
import { route as routePropType } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2)
    },
    header: {
        margin: theme.spacing(1)
    },
    buttonOpenDrawer: {
        float: "right"
    },
    buttonCloseDrawer: {
        margin: `${theme.spacing(1)}px 0`
    },
    drawerContent: {
        minWidth: "25vw"
    }
}))

function RoutePlayground({ route }) {
    const classes = useStyles()
    const [source, setSource] = useState(null)
    const [response, setResponse] = useState(null)
    const [showDrawer, setShowDrawer] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)
    const openDrawer = useCallback(() => setShowDrawer(true), [])
    const handlCloseDrawer = useCallback(() => setShowDrawer(false), [])

    const handleMakeRequest = useCallback(() => {
        setIsRequesting(true)
        const sourceToken = axios.CancelToken.source()
        setSource(sourceToken)
        axios({
            method: route.http_verb.toLowerCase(),
            url: route.url,
            cancelToken: sourceToken.token
        })
            .then(response => {
                setResponse(response)
                setIsRequesting(false)
            })
            .catch(() => {
                setIsRequesting(false)
            })
    }, [route])

    const handleCancelRequest = useCallback(() => {
        source && source.cancel()
    }, [source])

    useEffect(() => {
        setIsRequesting(false)
        source && source.cancel()
    }, [route])

    return (
        <Fragment>
            <Paper className={classes.paper} elevation={0}>
                <Typography variant="h5" className={classes.header}>
                    <ChipHttpVerb verb={route.http_verb} />
                    {route.uri}
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.buttonOpenDrawer}
                        onClick={openDrawer}
                    >
                        Route info
                    </Button>
                </Typography>
            </Paper>
            <RequestArea
                onMakeRequest={handleMakeRequest}
                onCancelRequest={handleCancelRequest}
                isRequesting={isRequesting}
            />
            <ResponseArea response={response} isRequesting={isRequesting} />
            <DrawerRoute
                showDrawer={showDrawer}
                handleCloseDrawer={handlCloseDrawer}
                route={route}
            />
        </Fragment>
    )
}

RoutePlayground.propTypes = {
    route: routePropType.isRequired
}

export default RoutePlayground
