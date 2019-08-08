import React, { useState, useCallback } from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Drawer from "@material-ui/core/Drawer"
import { makeStyles } from "@material-ui/core/styles"

import ChipHttpVerb from "../ChipHttpVerb"
import RouteInfo from "./RouteInfo"
import { route as routePropType } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    header: {
        margin: theme.spacing(1)
    },
    buttonOpenDrawer: {
        float: "right"
    },
    buttonCloseDrawer: {
        marginTop: theme.spacing(1)
    },
    drawerContent: {
        minWidth: "25vw"
    }
}))

function RoutePlayground({ route }) {
    const classes = useStyles()
    const [showDrawer, setShowDrawer] = useState(false)
    const openDrawer = useCallback(() => setShowDrawer(true), [])
    const closeDrawer = useCallback(() => setShowDrawer(false), [])
    return (
        <Box>
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
            <Drawer anchor="right" open={showDrawer} onClose={closeDrawer}>
                <Box className={classes.drawerContent}>
                    <RouteInfo route={route} />
                    <Typography component="p" align="center">
                        <Button
                            size="small"
                            color="secondary"
                            onClick={closeDrawer}
                            className={classes.buttonCloseDrawer}
                        >
                            Close info
                        </Button>
                    </Typography>
                </Box>
            </Drawer>
        </Box>
    )
}

RoutePlayground.propTypes = {
    route: routePropType.isRequired
}

export default RoutePlayground
