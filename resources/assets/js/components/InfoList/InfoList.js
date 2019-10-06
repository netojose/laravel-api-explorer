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

const EmptyMsg = () => (
    <Typography component="span" variant="body2" color="error">
        No value
    </Typography>
)

const InfoList = ({ items }) => {
    const classes = useStyles()
    return (
        <List className={classes.list} dense disablePadding>
            {items.map(item => (
                <ListItem dense key={item.label}>
                    <ListItemText
                        primary={item.label}
                        secondary={item.value || <EmptyMsg />}
                    />
                </ListItem>
            ))}
        </List>
    )
}
InfoList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    )
}

export default InfoList
