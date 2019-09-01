import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import DescriptionTable from "../../DescriptionTable"
import InfoList from "../../InfoList"
import { route as routePropType } from "../../../utils/sharedPropTypes"

const useStyles = makeStyles(theme => ({
    routeInfoSection: {
        margin: theme.spacing(1)
    }
}))

function RouteInfo({ route }) {
    const classes = useStyles()
    return (
        <Box>
            <Typography
                component="h6"
                variant="h6"
                className={classes.routeInfoSection}
            >
                Route info
            </Typography>
            <InfoList>
                <InfoList.Item label="Method" value={route.http_verb} />
                <InfoList.Item label="Name" value={route.name} />
                <InfoList.Item label="Controller" value={route.controller} />
                <InfoList.Item label="Action" value={route.action} />
                <InfoList.Item
                    label="Request handler"
                    value={route.request_handler}
                />
                <InfoList.Item label="Description" value={route.description} />
                <InfoList.Item label="Path" value={route.uri} />
                <InfoList.Item label="URL" value={route.url} />
                <InfoList.Item
                    label="Middlewares"
                    value={route.middlewares.join(", ")}
                />
                <InfoList.Item
                    label="Parameters"
                    value={route.parameters.join(", ")}
                />
            </InfoList>
            <Divider />
            <DescriptionTable
                title="Validation rules"
                items={route.rules}
                emptyMsg="No validation rules"
                columnLabel="Field"
                columnValue="Rules"
            />
            <DescriptionTable
                title="Parameters rules"
                items={route.wheres}
                emptyMsg="No parameters rules"
                columnLabel="Parameter"
                columnValue="Rule"
            />
        </Box>
    )
}

RouteInfo.propTypes = {
    route: routePropType.isRequired
}

export default RouteInfo
