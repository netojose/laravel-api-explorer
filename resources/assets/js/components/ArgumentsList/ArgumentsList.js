import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"

import { argumentsList as argumentsListPropTypes } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(() => ({
    inputKey: {
        marginTop: 10
    }
}))

function ArgumentsList({ items, onChangeValue }) {
    const classes = useStyles()
    return (
        <Box>
            {items.map(item => (
                <Grid key={item.key} container spacing={3}>
                    <Grid item xs={3}>
                        <Input
                            fullWidth
                            placeholder={item.key}
                            disabled={item.disabledKey}
                            value={item.key}
                            className={classes.inputKey}
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
                            name={item.key}
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
        </Box>
    )
}
ArgumentsList.propTypes = {
    items: argumentsListPropTypes.isRequired,
    onChangeValue: PropTypes.func.isRequired
}

export default ArgumentsList
