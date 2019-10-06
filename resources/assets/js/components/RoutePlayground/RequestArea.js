import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"

import Panel from "./Panel"
import ArgumentsList from "../ArgumentsList"
import JsonEditor from "./JsonEditor"
import TabPanel, { a11yProps } from "../TabPanel"
import { argumentsList as argumentsListPropTypes } from "../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}))

function RequestArea({
    onMakeRequest,
    onCancelRequest,
    onChangeJsonBody,
    isRequesting,
    parameters,
    queryStrings,
    headers,
    jsonBody,
    onEditArgument,
    onAddArgument,
    onRemoveArgument,
    onToggleCheckArgument
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

    const handleRemoveArgumentQueryString = id =>
        onRemoveArgument("queryStrings", id)

    const handleRemoveArgumentHeader = id => onRemoveArgument("headers", id)

    const handleToggleCheckArgumentQueryString = id =>
        onToggleCheckArgument("queryStrings", id)

    const handleToggleCheckArgumentHeader = id =>
        onToggleCheckArgument("headers", id)

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
                aria-label="Request config"
            >
                <Tab label="Route parameters" {...a11yProps("request", 0)} />
                <Tab label="Body" {...a11yProps("request", 1)} />
                <Tab label="Query string" {...a11yProps("request", 2)} />
                <Tab label="Headers" {...a11yProps("request", 3)} />
            </Tabs>
            <TabPanel value={currentTab} index={0} id="request">
                <ArgumentsList
                    items={parameters}
                    onChangeValue={handleChangeParameterValue}
                    enabledAddArgument={false}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={1} id="request">
                <JsonEditor onChange={onChangeJsonBody} content={jsonBody} />
            </TabPanel>
            <TabPanel value={currentTab} index={2} id="request">
                <ArgumentsList
                    items={queryStrings}
                    onChangeName={handleChangeQSName}
                    onChangeValue={handleChangeQSValue}
                    onAddArgument={handleAddArgumentQueryString}
                    onRemoveArgument={handleRemoveArgumentQueryString}
                    onToggleCheckArgument={handleToggleCheckArgumentQueryString}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={3} id="request">
                <ArgumentsList
                    items={headers}
                    onChangeName={handleChangeHeaderName}
                    onChangeValue={handleChangeHeaderValue}
                    onAddArgument={handleAddArgumentHeader}
                    onRemoveArgument={handleRemoveArgumentHeader}
                    onToggleCheckArgument={handleToggleCheckArgumentHeader}
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
    jsonBody: PropTypes.object.isRequired,
    onEditArgument: PropTypes.func.isRequired,
    onAddArgument: PropTypes.func.isRequired,
    onRemoveArgument: PropTypes.func.isRequired,
    onToggleCheckArgument: PropTypes.func.isRequired
}

export default RequestArea
