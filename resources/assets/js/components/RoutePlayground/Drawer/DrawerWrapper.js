import React from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import DrawerMUI from "@material-ui/core/Drawer"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    buttonCloseDrawer: {
        margin: `${theme.spacing(1)}px 0`
    },
    drawerContent: {
        minWidth: "25vw"
    }
}))

function DrawerWrapper({ showDrawer, handleCloseDrawer, children }) {
    const classes = useStyles()
    return (
        <DrawerMUI anchor="right" open={showDrawer} onClose={handleCloseDrawer}>
            <Box className={classes.drawerContent}>
                {children}
                <Typography component="p" align="center">
                    <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
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
DrawerWrapper.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    handleCloseDrawer: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default DrawerWrapper
