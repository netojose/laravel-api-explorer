import React from "react"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2)
    }
}))

function Panel({ title, children }) {
    const classes = useStyles()
    return (
        <Card className={classes.wrapper}>
            <CardHeader title={title} />
            <CardContent>{children}</CardContent>
        </Card>
    )
}
Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Panel
