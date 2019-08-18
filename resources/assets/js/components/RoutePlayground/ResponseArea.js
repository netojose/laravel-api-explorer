import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"

import Panel from "./Panel"
import JsonViewer from "./JsonViewer"

const useStyles = makeStyles(theme => ({
    text: {
        color: theme.palette.grey[400]
    },
    progress: {
        margin: `${theme.spacing(2)}px auto`,
        display: "block"
    }
}))

function ResponseArea({ response, isRequesting }) {
    const classes = useStyles()
    return (
        <Panel title="Response">
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

            {response && <JsonViewer content={response.data} />}
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
