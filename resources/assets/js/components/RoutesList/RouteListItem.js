import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"
import orange from "@material-ui/core/colors/orange"
import blueGrey from "@material-ui/core/colors/blueGrey"

import { route as routePropType } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1)
    },
    verb_GET: { background: blue[500] },
    verb_POST: { background: green[500] },
    verb_PUT: { background: blueGrey[500] },
    verb_DELETE: { background: red[500] },
    verb_PATCH: { background: orange[500] }
}))

function RouteListItem({ route, isSelected, onSelect }) {
    const classes = useStyles()
    return (
        <React.Fragment key={route.__id}>
            <ListItem
                selected={isSelected}
                onClick={() => onSelect(route.__id)}
                disabled={!route.exists}
                button
            >
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Chip
                                label={route.http_verb}
                                size="small"
                                className={`${classes.chip} ${
                                    classes[`verb_${route.http_verb}`]
                                }`}
                            />
                            <Typography
                                component="span"
                                variant="body2"
                                color={route.exists ? "textPrimary" : "error"}
                            >
                                {route.uri}
                            </Typography>
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
    )
}

RouteListItem.defaultProps = {
    isSelected: false
}

RouteListItem.propTypes = {
    route: routePropType.isRequired,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
}

export default RouteListItem
