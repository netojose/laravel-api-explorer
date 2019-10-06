import React from "react"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2)
    }
}))

function Panel({ title, children, actions }) {
    const classes = useStyles()
    return (
        <Card className={classes.wrapper}>
            <CardHeader title={title} />
            <CardContent>{children}</CardContent>
            {actions && <CardActions>{actions}</CardActions>}
        </Card>
    )
}
Panel.defaultProps = {
    actions: null
}
Panel.propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.node
}

export default Panel
