import React from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
}))

const InfoList = ({ children }) => {
    const classes = useStyles()
    return (
        <List className={classes.list} dense disablePadding>
            {children}
        </List>
    )
}
InfoList.propTypes = {
    children: PropTypes.node
}

InfoList.Item = ({ label, value }) => (
    <ListItem dense>
        <ListItemText
            primary={label}
            secondary={value || <ErrorMsg text="No value" />}
        />
    </ListItem>
)
InfoList.Item.displayName = "InfoListItem"
InfoList.Item.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
InfoList.Item.defaultProps = {
    value: null
}

const ErrorMsg = ({ text }) => {
    return (
        <Typography component="span" variant="body2" color="error">
            {text}
        </Typography>
    )
}
ErrorMsg.propTypes = {
    text: PropTypes.string.isRequired
}

export default InfoList
