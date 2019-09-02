import React, { useState, useCallback, useMemo, useEffect } from "react"
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
    updateGlobalItem,
    removeGlobalItem,
    getGlobalConfig
} from "../../utils/storage"

function SettingsPanel({ handleClose, onUpdateSettings }) {
    const [currentTab, setCurrentTab] = useState(0)
    const [variables, setVariables] = useState([])
    const [headers, setHeaders] = useState([])
    const handleChangeTab = (_, newValue) => setCurrentTab(newValue)

    useEffect(onUpdateSettings, [variables, headers])

    const refresh = useMemo(
        () => ({
            headers: () => setHeaders(getGlobalConfig("headers")),
            variables: () => setVariables(getGlobalConfig("variables"))
        }),
        []
    )

    const addItem = useCallback(type => {
        addGlobalItem(type)
        refresh[type]()
    }, [])

    const addVariable = () => addItem("variables")
    const addHeader = () => addItem("headers")

    const removeItem = useCallback((type, id) => {
        removeGlobalItem(type, id)
        refresh[type]()
    }, [])

    const removeVariable = id => removeItem("variables", id)
    const removeHeader = id => removeItem("headers", id)

    const updateField = useCallback((type, id, field, value) => {
        updateGlobalItem(type, id, field, value)
        refresh[type]()
    }, [])

    const toggleCheck = useCallback((type, id) => {
        const item = getGlobalConfig(type).find(item => item.__id === id)
        updateField(type, id, "checked", !item.checked)
    }, [])

    const toggleCheckVariable = id => toggleCheck("variables", id)
    const toggleCheckHeader = id => toggleCheck("headers", id)

    const editNameVariable = (id, value) =>
        updateField("variables", id, "name", value)

    const editNameHeader = (id, value) =>
        updateField("headers", id, "name", value)

    const editValueVariable = (id, value) =>
        updateField("variables", id, "value", value)

    const editValueHeader = (id, value) =>
        updateField("headers", id, "value", value)

    useEffect(() => {
        refresh.variables()
        refresh.headers()
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
                        onChangeName={editNameVariable}
                        onChangeValue={editValueVariable}
                        onAddArgument={addVariable}
                        onRemoveArgument={removeVariable}
                        onToggleCheckArgument={toggleCheckVariable}
                    />
                </TabPanel>
                <TabPanel value={currentTab} index={1} id="settings">
                    <ArgumentsList
                        items={headers}
                        onChangeName={editNameHeader}
                        onChangeValue={editValueHeader}
                        onAddArgument={addHeader}
                        onRemoveArgument={removeHeader}
                        onToggleCheckArgument={toggleCheckHeader}
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

SettingsPanel.defaultProps = {
    onUpdateSettings: () => null
}

SettingsPanel.propTypes = {
    handleClose: PropTypes.func.isRequired,
    onUpdateSettings: PropTypes.func
}

export default SettingsPanel
