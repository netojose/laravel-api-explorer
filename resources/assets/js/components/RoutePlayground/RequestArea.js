import React, { useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"

import Panel from "./Panel"

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}))

const TabPanel = ({ children, value, index }) =>
    value === index ? (
        <Box
            m={1}
            role="tabpanel"
            id={`request-tabpanel-${index}`}
            ria-labelledby={`request-tab-${index}`}
        >
            {children}
        </Box>
    ) : null
TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

function a11yProps(index) {
    return {
        id: `request-tab-${index}`,
        "aria-controls": `request-tabpanel-${index}`
    }
}

function RequestArea({ onMakeRequest, onCancelRequest, isRequesting }) {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const handleChange = (_, newValue) => setValue(newValue)
    return (
        <Panel title="Request">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
            >
                <Tab label="Body" {...a11yProps(0)} />
                <Tab label="Route parameters" {...a11yProps(1)} />
                <Tab label="Query string" {...a11yProps(2)} />
                <Tab label="Headers" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Body
            </TabPanel>
            <TabPanel value={value} index={1}>
                Route parameters
            </TabPanel>
            <TabPanel value={value} index={2}>
                Query string
            </TabPanel>
            <TabPanel value={value} index={3}>
                Headers
            </TabPanel>
            <Divider />
            <Button
                className={classes.button}
                color="primary"
                variant="outlined"
                onClick={onMakeRequest}
                disabled={isRequesting}
            >
                Make request
            </Button>
            <Button
                className={classes.button}
                color="secondary"
                variant="outlined"
                onClick={onCancelRequest}
                disabled={!isRequesting}
            >
                Cancel request
            </Button>
        </Panel>
    )
}
RequestArea.propTypes = {
    onMakeRequest: PropTypes.func.isRequired,
    onCancelRequest: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired
}

export default RequestArea
