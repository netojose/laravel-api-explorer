import React, { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import SearchIcon from "@material-ui/icons/Search"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
        background: "red"
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    root: {
        padding: "2px 4px",
        margin: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        width: `calc(100% - ${theme.spacing(4)}px)`
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
    const [searchTerm, setSearchTerm] = useState("")
    const onSearch = useCallback(
        ({ target }) => setSearchTerm(target.value),
        []
    )
    return (
        <div>
            <Paper className={classes.root}>
                <InputBase
                    value={searchTerm}
                    onChange={onSearch}
                    className={classes.input}
                    placeholder="Search route"
                    inputProps={{ "aria-label": "Search route" }}
                />
                <IconButton disabled className={classes.iconButton}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List component="nav">
                {routes.map(route => (
                    <React.Fragment key={route.__id}>
                        <ListItem
                            selected={route.__id === selected}
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
                                            style={{
                                                background: getChipColor(
                                                    route.http_verb
                                                )
                                            }}
                                            className={classes.chip}
                                        />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color={
                                                route.exists
                                                    ? "textPrimary"
                                                    : "error"
                                            }
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
