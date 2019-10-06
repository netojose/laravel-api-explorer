import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import ChipHttpVerb from "../ChipHttpVerb"
import { route as routePropType } from "../../utils/sharedPropTypes"

function RouteListItem({ route, isSelected, onSelect }) {
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
                            <ChipHttpVerb verb={route.http_verb} />
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
