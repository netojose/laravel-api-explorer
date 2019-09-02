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

function ArgumentsList({
    items,
    enabledAddArgument,
    onChangeValue,
    onChangeName,
    onAddArgument,
    onRemoveArgument,
    onToggleCheckArgument
}) {
    const classes = useStyles()
    return (
        <Box>
            {items.map(item => (
                <Grid key={item.__id} container spacing={3}>
                    <Grid item xs={3}>
                        <Input
                            fullWidth
                            placeholder={item.name}
                            disabled={item.disabledName}
                            value={item.name}
                            onChange={e =>
                                onChangeName(item.__id, e.target.value)
                            }
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
                            onChange={e =>
                                onChangeValue(item.__id, e.target.value)
                            }
                            inputProps={{
                                "aria-label": "description"
                            }}
                            endAdornment={
                                <Fragment>
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={() =>
                                            onToggleCheckArgument(item.__id)
                                        }
                                        disabled={
                                            !onToggleCheckArgument ||
                                            item.disabledToggleCheck
                                        }
                                        value={true}
                                        color="primary"
                                        inputProps={{
                                            "aria-label": "Enable/disable field"
                                        }}
                                    />
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Remove field"
                                            disabled={
                                                !onRemoveArgument ||
                                                item.disabledDelete
                                            }
                                            onClick={() =>
                                                onRemoveArgument(item.__id)
                                            }
                                        >
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
                onClick={onAddArgument}
                disabled={!enabledAddArgument}
            >
                Add item
            </Button>
        </Box>
    )
}
ArgumentsList.defaultProps = {
    enabledAddArgument: true,
    onAddArgument: () => undefined,
    onRemoveArgument: null,
    onToggleCheckArgument: null,
    onChangeName: () => undefined
}
ArgumentsList.propTypes = {
    items: argumentsListPropTypes.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    onChangeName: PropTypes.func,
    onAddArgument: PropTypes.func,
    onRemoveArgument: PropTypes.func,
    onToggleCheckArgument: PropTypes.func,
    enabledAddArgument: PropTypes.bool
}

export default ArgumentsList
