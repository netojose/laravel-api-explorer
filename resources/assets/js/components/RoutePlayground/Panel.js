import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2)
    },
    header: {
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.background.default
    }
}))

function Panel({ title, children }) {
    const classes = useStyles()
    return (
        <Paper className={classes.wrapper}>
            <Typography variant="h6" className={classes.header}>
                {title}
            </Typography>
            {children}
        </Paper>
    )
}
Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Panel
