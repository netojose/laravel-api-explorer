import React from "react"
import PropTypes from "prop-types"

import DrawerWrapper from "./DrawerWrapper"
import DescriptionTable from "../../DescriptionTable"
import InfoList from "../../InfoList"

function DrawerResponse({ showDrawer, handleCloseDrawer, data }) {
    return (
        <DrawerWrapper
            showDrawer={showDrawer}
            handleCloseDrawer={handleCloseDrawer}
        >
            <InfoList
                items={[
                    { label: "Status", value: data.status },
                    { label: "Status text", value: data.statusText },
                    { label: "Duration", value: `${data.duration}ms` }
                ]}
            />
            <DescriptionTable
                title="Headers"
                columnLabel="Header"
                columnValue="Value"
                emptyMsg="Request without headers"
                items={data.headers}
            />
        </DrawerWrapper>
    )
}
DrawerResponse.defaultProps = {
    response: null
}
DrawerResponse.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    handleCloseDrawer: PropTypes.func.isRequired,
    data: PropTypes.shape({
        status: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        statusText: PropTypes.string.isRequired,
        headers: PropTypes.object.isRequired
    }).isRequired
}

export default DrawerResponse
