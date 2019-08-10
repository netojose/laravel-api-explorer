import React from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import DrawerMUI from "@material-ui/core/Drawer"
import { makeStyles } from "@material-ui/core/styles"

import { route as routePropType } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    buttonCloseDrawer: {
        margin: `${theme.spacing(1)}px 0`
    },
    drawerContent: {
        minWidth: "25vw"
    }
}))

import RouteInfo from "./RouteInfo"

function DrawerRoute({ showDrawer, handleCloseDrawer, route }) {
    const classes = useStyles()
    return (
        <DrawerMUI anchor="right" open={showDrawer} onClose={handleCloseDrawer}>
            <Box className={classes.drawerContent}>
                <RouteInfo route={route} />
                <Typography component="p" align="center">
                    <Button
                        size="small"
                        color="secondary"
                        onClick={handleCloseDrawer}
                        className={classes.buttonCloseDrawer}
                    >
                        Close info
                    </Button>
                </Typography>
            </Box>
        </DrawerMUI>
    )
}
DrawerRoute.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    handleCloseDrawer: PropTypes.func.isRequired,
    route: routePropType
}

export default DrawerRoute
