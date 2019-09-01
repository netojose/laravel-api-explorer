import React from "react"
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types"

export function a11yProps(id, index) {
    return {
        id: `${id}-tab-${index}`,
        "aria-controls": `${id}-tabpanel-${index}`
    }
}

function TabPanel({ children, value, index, id }) {
    return value === index ? (
        <Box
            m={1}
            role="tabpanel"
            id={`${id}-tabpanel-${index}`}
            ria-labelledby={`${id}-tab-${index}`}
        >
            {children}
        </Box>
    ) : null
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
}

export default TabPanel
