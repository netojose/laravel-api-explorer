import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"

import { argumentsList as argumentsListPropTypes } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    inputName: {
        marginTop: 10
    },
    buttonAddItem: {
        marginTop: theme.spacing(1)
    }
}))

function ArgumentsList({ items, enabledAddArgument, onChangeValue }) {
    const classes = useStyles()
    return (
        <Box>
            {items.map(item => (
                <Grid key={item.name} container spacing={3}>
                    <Grid item xs={3}>
                        <Input
                            fullWidth
                            placeholder={item.name}
                            disabled={item.disabledName}
                            value={item.name}
                            className={classes.inputName}
                            inputProps={{
                                "aria-label": "description"
                            }}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Input
                            fullWidth
                            placeholder={item.placeholderValue || "Value"}
                            disabled={item.disabledValue}
                            id={item.__id}
                            name={item.name}
                            value={item.value}
                            onChange={onChangeValue}
                            inputProps={{
                                "aria-label": "description"
                            }}
                            endAdornment={
                                <Fragment>
                                    <Checkbox
                                        checked={false}
                                        onChange={() => null}
                                        value={true}
                                        color="primary"
                                        inputProps={{
                                            "aria-label": "Enable/disable field"
                                        }}
                                    />
                                    <InputAdornment position="end">
                                        <IconButton aria-label="Remove field">
                                            <DeleteIcon />
                                        </IconButton>
                                    </InputAdornment>
                                </Fragment>
                            }
                        />
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                color="primary"
                className={classes.buttonAddItem}
                onClick={() => null}
                disabled={!enabledAddArgument}
            >
                Add item
            </Button>
        </Box>
    )
}
ArgumentsList.defaultProps = {
    enabledAddArgument: true
}
ArgumentsList.propTypes = {
    items: argumentsListPropTypes.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    enabledAddArgument: PropTypes.bool
}

export default ArgumentsList
