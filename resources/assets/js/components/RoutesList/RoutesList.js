import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
        background: "red"
    }
}))

function getChipColor(verb) {
    return {
        GET: "#2196f3",
        POST: "#4caf50",
        PUT: "#ff9800",
        DELETE: "#f44336",
        PATCH: "#9e9e9e"
    }[verb]
}

function RoutesList({ routes, selected, onSelect }) {
    const classes = useStyles()
    return (
        <div>
            <List component="nav">
                {routes.map(route => (
                    <React.Fragment key={route.__id}>
                        <ListItem
                            selected={route.__id === selected}
                            onClick={() => onSelect(route.__id)}
                            button
                        >
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Chip
                                            label={route.http_verb}
                                            size="small"
                                            style={{
                                                background: getChipColor(
                                                    route.http_verb
                                                )
                                            }}
                                            className={classes.chip}
                                        />
                                        {route.uri}
                                        {route.name && (
                                            <React.Fragment>
                                                {" "}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {route.name}
                                                </Typography>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                }
                                secondary={
                                    route.description && (
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {route.description}
                                            </Typography>
                                        </React.Fragment>
                                    )
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
        </div>
    )
}

RoutesList.defaultProps = {
    selected: null
}

RoutesList.propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            __id: PropTypes.string,
            action: PropTypes.string,
            controller: PropTypes.string,
            description: PropTypes.string,
            exists: PropTypes.bool,
            http_verb: PropTypes.oneOf([
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE"
            ]),
            middlewares: PropTypes.arrayOf(PropTypes.string),
            name: PropTypes.string,
            parameters: PropTypes.array,
            rules: PropTypes.object,
            uri: PropTypes.string,
            url: PropTypes.string,
            wheres: PropTypes.object
        })
    )
}

export default RoutesList
