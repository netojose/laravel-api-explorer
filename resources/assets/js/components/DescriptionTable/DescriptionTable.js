import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import Table from "@material-ui/core/Table"
import Tooltip from "@material-ui/core/Tooltip"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import HelpIcon from "@material-ui/icons/HelpOutline"
import Divider from "@material-ui/core/Divider"

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
        background: theme.palette.grey[300]
    }
}))

const TableCellLabel = ({ content }) => (
    <TableCell component="th" scope="row">
        {content}
    </TableCell>
)
TableCellLabel.propTypes = {
    content: PropTypes.string.isRequired
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
                                        <HelpIcon color="primary" />
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

const DescriptionTable = ({
    title,
    items,
    emptyMsg,
    columnLabel,
    columnValue
}) => {
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

DescriptionTable.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    emptyMsg: PropTypes.string.isRequired,
    columnLabel: PropTypes.string.isRequired,
    columnValue: PropTypes.string.isRequired
}

export default DescriptionTable
