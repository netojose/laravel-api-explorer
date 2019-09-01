import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Button from "@material-ui/core/Button"

import TabPanel, { a11yProps } from "../TabPanel"
import ArgumentsList from "../ArgumentsList"
import {
    addGlobalItem,
    removeGlobalItem,
    getGlobalConfig
} from "../../utils/storage"

function ConfigPanel({ handleClose }) {
    const [currentTab, setCurrentTab] = useState(0)
    const [variables, setVariables] = useState([])
    const [headers, setHeaders] = useState([])
    const handleChangeTab = (_, newValue) => setCurrentTab(newValue)

    const addVariable = useCallback(() => {
        addGlobalItem("variables")
        refreshVariables()
    }, [])

    const addHeader = useCallback(() => {
        addGlobalItem("headers")
        refreshHeaders()
    }, [])

    const removeVariable = useCallback(id => {
        removeGlobalItem("variables", id)
        refreshVariables()
    }, [])

    const removeHeader = useCallback(id => {
        removeGlobalItem("headers", id)
        refreshHeaders()
    }, [])

    const refreshVariables = useCallback(
        () => setVariables(getGlobalConfig("variables")),
        []
    )

    const refreshHeaders = useCallback(
        () => setHeaders(getGlobalConfig("headers")),
        []
    )

    useEffect(() => {
        refreshVariables()
        refreshHeaders()
    }, [])

    return (
        <Card>
            <CardHeader title="Settings" />
            <CardContent>
                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    aria-label="Settings"
                >
                    <Tab label="Variables" {...a11yProps("settings", 0)} />
                    <Tab label="Global Headers" {...a11yProps("settings", 1)} />
                </Tabs>
                <TabPanel value={currentTab} index={0} id="settings">
                    <ArgumentsList
                        items={variables}
                        onChangeValue={() => null}
                        onChangeName={() => null}
                        onAddArgument={addVariable}
                        onRemoveArgument={removeVariable}
                        onToggleCheckArgument={() => null}
                    />
                </TabPanel>
                <TabPanel value={currentTab} index={1} id="settings">
                    <ArgumentsList
                        items={headers}
                        onChangeValue={() => null}
                        onChangeName={() => null}
                        onAddArgument={addHeader}
                        onRemoveArgument={removeHeader}
                        onToggleCheckArgument={() => null}
                    />
                </TabPanel>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClose}>
                    Close
                </Button>
            </CardActions>
        </Card>
    )
}

ConfigPanel.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default ConfigPanel
