import React, { useState, useCallback, Fragment } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"

import Panel from "./Panel"
import DrawerResponse from "./Drawer/DrawerResponse"
import JsonViewer from "./JsonViewer"

const useStyles = makeStyles(theme => ({
    text: {
        color: theme.palette.grey[400]
    },
    buttonOpenDrawer: {
        float: "right"
    },
    progress: {
        margin: `${theme.spacing(2)}px auto`,
        display: "block"
    }
}))

function ResponseArea({ response, isRequesting }) {
    const classes = useStyles()
    const [showDrawer, setShowDrawer] = useState(false)
    const openDrawer = useCallback(() => setShowDrawer(true), [])
    const handlCloseDrawer = useCallback(() => setShowDrawer(false), [])
    return (
        <Panel
            title={
                <Fragment>
                    Response
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.buttonOpenDrawer}
                        disabled={!response}
                        onClick={openDrawer}
                    >
                        Response info
                    </Button>
                </Fragment>
            }
        >
            {!response && !isRequesting && (
                <Typography
                    align="center"
                    className={classes.text}
                    variant="h5"
                >
                    Make a request
                </Typography>
            )}

            {isRequesting && <CircularProgress className={classes.progress} />}

            {response && (
                <Fragment>
                    <JsonViewer content={response.data} />
                    <DrawerResponse
                        showDrawer={showDrawer}
                        handleCloseDrawer={handlCloseDrawer}
                        data={{
                            status: response.status,
                            duration: response.duration,
                            statusText: response.statusText,
                            headers: response.headers
                        }}
                    />
                </Fragment>
            )}
        </Panel>
    )
}
ResponseArea.defaultProps = {
    response: null
}
ResponseArea.propTypes = {
    response: PropTypes.object,
    isRequesting: PropTypes.bool.isRequired
}

export default ResponseArea
