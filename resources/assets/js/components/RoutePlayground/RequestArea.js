import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"

import Panel from "./Panel"
import ArgumentsList from "../ArgumentsList"
import JsonEditor from "./JsonEditor"
import { argumentsList as argumentsListPropTypes } from "../../utils/sharedPropTypes"

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

function RequestArea({
    onMakeRequest,
    onCancelRequest,
    onChangeJsonBody,
    isRequesting,
    parameters,
    queryStrings,
    headers,
    onEditArgument,
    onAddArgument,
    jsonBody
}) {
    const classes = useStyles()
    const [currentTab, setCurrentTab] = useState(0)
    const handleChangeTab = (_, newValue) => setCurrentTab(newValue)

    const handleChangeParameterValue = (id, value) =>
        onEditArgument("parameters", "value", id, value)

    const handleChangeHeaderName = (id, value) =>
        onEditArgument("headers", "name", id, value)
    const handleChangeHeaderValue = (id, value) =>
        onEditArgument("headers", "value", id, value)

    const handleChangeQSName = (id, value) =>
        onEditArgument("queryStrings", "name", id, value)
    const handleChangeQSValue = (id, value) =>
        onEditArgument("queryStrings", "value", id, value)

    const handleAddArgumentQueryString = () => onAddArgument("queryStrings")
    const handleAddArgumentHeader = () => onAddArgument("headers")

    return (
        <Panel
            title="Request"
            actions={
                <Fragment>
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
                </Fragment>
            }
        >
            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                aria-label="simple tabs example"
            >
                <Tab label="Route parameters" {...a11yProps(0)} />
                <Tab label="Body" {...a11yProps(1)} />
                <Tab label="Query string" {...a11yProps(2)} />
                <Tab label="Headers" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
                <ArgumentsList
                    items={parameters}
                    onChangeValue={handleChangeParameterValue}
                    enabledAddArgument={false}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <JsonEditor onChange={onChangeJsonBody} content={jsonBody} />
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                <ArgumentsList
                    items={queryStrings}
                    onChangeName={handleChangeQSName}
                    onChangeValue={handleChangeQSValue}
                    onAddArgument={handleAddArgumentQueryString}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
                <ArgumentsList
                    items={headers}
                    onChangeName={handleChangeHeaderName}
                    onChangeValue={handleChangeHeaderValue}
                    onAddArgument={handleAddArgumentHeader}
                />
            </TabPanel>
        </Panel>
    )
}
RequestArea.propTypes = {
    onMakeRequest: PropTypes.func.isRequired,
    onCancelRequest: PropTypes.func.isRequired,
    onChangeJsonBody: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    parameters: argumentsListPropTypes.isRequired,
    queryStrings: argumentsListPropTypes.isRequired,
    headers: argumentsListPropTypes.isRequired,
    onEditArgument: PropTypes.func.isRequired,
    onAddArgument: PropTypes.func.isRequired,
    jsonBody: PropTypes.object.isRequired
}

export default RequestArea
