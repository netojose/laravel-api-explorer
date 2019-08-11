import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Chip from "@material-ui/core/Chip"
import Tooltip from "@material-ui/core/Tooltip"
import Avatar from "@material-ui/core/Avatar"
import HelpIcon from "@material-ui/icons/HelpOutline"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { route as routePropType } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    routeInfoSection: {
        margin: theme.spacing(1)
    },
    list: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    chip: {
        margin: theme.spacing(0.5)
    },
    avatar: {
        background: "transparent"
    }
}))

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

const Item = ({ label, value }) => (
    <ListItem dense>
        <ListItemText
            primary={label}
            secondary={value || <ErrorMsg text="No value" />}
        />
    </ListItem>
)
Item.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
}
Item.defaultProps = {
    value: null
}

const TableCellLabel = ({ content }) => (
    <TableCell component="th" scope="row">
        {content}
    </TableCell>
)
TableCellLabel.propTypes = {
    content: PropTypes.string.isRequired
}

const TableCellValue = ({ content }) => {
    const classes = useStyles()
    const values = Array.isArray(content) ? content : [content]
    return (
        <TableCell align="right">
            {values.map(value => {
                const itemValue = value.split("\\").splice(-1, 1)[0]
                return (
                    <Chip
                        key={value}
                        size="small"
                        variant="outlined"
                        label={itemValue}
                        className={classes.chip}
                        avatar={
                            itemValue === value ? null : (
                                <Avatar className={classes.avatar}>
                                    <Tooltip title={value}>
                                        <HelpIcon />
                                    </Tooltip>
                                </Avatar>
                            )
                        }
                    />
                )
            })}
        </TableCell>
    )
}
TableCellValue.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
}

const TableItems = ({ title, items, emptyMsg, columnLabel, columnValue }) => {
    const classes = useStyles()
    const keys = useMemo(() => Object.keys(items), [items])
    return (
        <React.Fragment>
            <Typography
                component="h6"
                variant="h6"
                className={classes.routeInfoSection}
            >
                {title}
            </Typography>
            {keys.length < 1 ? (
                <React.Fragment>
                    <p className={classes.routeInfoSection}>
                        <ErrorMsg text={emptyMsg} />
                    </p>
                    <Divider />
                </React.Fragment>
            ) : (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{columnLabel}</TableCell>
                            <TableCell align="right">{columnValue}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {keys.map(key => (
                            <TableRow key={key}>
                                <TableCellLabel content={key} />
                                <TableCellValue content={items[key]} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </React.Fragment>
    )
}
TableItems.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    emptyMsg: PropTypes.string.isRequired,
    columnLabel: PropTypes.string.isRequired,
    columnValue: PropTypes.string.isRequired
}

function RouteInfo({ route }) {
    const classes = useStyles()
    return (
        <Box>
            <Typography
                component="h6"
                variant="h6"
                className={classes.routeInfoSection}
            >
                Route info
            </Typography>
            <List className={classes.list} dense disablePadding>
                <Item label="Method" value={route.http_verb} />
                <Item label="Name" value={route.name} />
                <Item label="Controller" value={route.controller} />
                <Item label="Action" value={route.action} />
                <Item label="Request handler" value={route.request_handler} />
                <Item label="Description" value={route.description} />
                <Item label="Path" value={route.uri} />
                <Item label="URL" value={route.url} />
                <Item
                    label="Middlewares"
                    value={route.middlewares.join(", ")}
                />
                <Item label="Parameters" value={route.parameters.join(", ")} />
            </List>
            <Divider />
            <TableItems
                title="Validation rules"
                items={route.rules}
                emptyMsg="No validation rules"
                columnLabel="Field"
                columnValue="Rules"
            />
            <TableItems
                title="Parameters rules"
                items={route.wheres}
                emptyMsg="No parameters rules"
                columnLabel="Parameter"
                columnValue="Rule"
            />
        </Box>
    )
}

RouteInfo.propTypes = {
    route: routePropType.isRequired
}

export default RouteInfo
