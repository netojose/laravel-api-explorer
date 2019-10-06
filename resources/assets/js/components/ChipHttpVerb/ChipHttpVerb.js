import React from "react"
import PropTypes from "prop-types"
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"
import orange from "@material-ui/core/colors/orange"
import blueGrey from "@material-ui/core/colors/blueGrey"

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

function ChipHttpVerb({ verb }) {
    const classes = useStyles()
    return (
        <Chip
            label={verb}
            size="small"
            className={`${classes.chip} ${classes[`verb_${verb}`]}`}
        />
    )
}

ChipHttpVerb.propTypes = {
    verb: PropTypes.oneOf(["GET", "POST", "PUT", "DELETE", "PATCH"]).isRequired
}

export default ChipHttpVerb
