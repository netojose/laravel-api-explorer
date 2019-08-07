import React, { useState, useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import SearchIcon from "@material-ui/icons/Search"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"

import { route as routePropType } from "../../utils/sharedPropTypes"
import RouteListItem from "./RouteListItem"

const APPBAR_HEIGHT = "64px"
const FORM_HEIGHT = "64px"

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2)
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    form: {
        padding: "2px 4px",
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        width: `calc(100% - ${theme.spacing(4)}px)`
    },
    list: {
        height: `calc(100vh - ${APPBAR_HEIGHT} - ${FORM_HEIGHT} - ${theme.spacing(
            2
        )}px)`,
        overflow: "auto"
    }
}))

function RoutesList({ routes, selected, onSelect }) {
    const classes = useStyles()
    const [searchTerm, setSearchTerm] = useState("")
    const onSearch = useCallback(({ target }) => setSearchTerm(target.value), [
        routes
    ])

    const filteredRoutes = useMemo(() => {
        if (!searchTerm) {
            return routes
        }
        return routes.filter(
            route =>
                (route.name && route.name.includes(searchTerm)) ||
                route.uri.includes(searchTerm)
        )
    }, [routes, searchTerm])

    return (
        <Box borderRight={1} borderColor="grey.300" className={classes.root}>
            <Paper className={classes.form}>
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
            <List component="nav" className={classes.list}>
                {filteredRoutes.map(route => (
                    <RouteListItem
                        key={route.__id}
                        route={route}
                        isSelected={route.__id === selected}
                        onSelect={onSelect}
                    />
                ))}
            </List>
        </Box>
    )
}

RoutesList.defaultProps = {
    selected: null
}

RoutesList.propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    routes: PropTypes.arrayOf(routePropType)
}

export default RoutesList
