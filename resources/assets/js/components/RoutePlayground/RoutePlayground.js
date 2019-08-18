import React, {
    Fragment,
    useState,
    useEffect,
    useCallback,
    useMemo
} from "react"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"

import ChipHttpVerb from "../ChipHttpVerb"
import DrawerRoute from "./DrawerRoute"
import RequestArea from "./RequestArea"
import ResponseArea from "./ResponseArea"
import { route as routePropType } from "../../utils/sharedPropTypes"
import {
    getRouteArguments,
    addRouteArgumentItem,
    updateRouteArgumentItem,
    updateRouteBodyJson,
    getCurrentActiveRouteId
} from "../../utils/storage"

function generateFieldId() {
    return `field_${window.performance.now()}`
}

const format = {
    parameters: (route, stored) =>
        stored.map(item => ({
            ...item,
            disabledName: true,
            placeholderValue: route.wheres[name]
        })),
    queryStrings: (route, stored) => stored,
    headers: (route, stored) => stored
}

function formatUrl(url, parameters) {
    const urlParams = url.match(/\{(.*?)\}/g)

    if (!Array.isArray(urlParams)) {
        return url
    }

    let formatedUrl = url
    urlParams.forEach(param => {
        const name = param.match(/[a-zA-Z0-9_.]/g).join("")
        const parameter = parameters.find(p => p.name === name)
        const value = parameter ? parameter.value : ""
        formatedUrl = formatedUrl.replace(param, value)
    })
    return formatedUrl
}

function formatArguments(params) {
    return params.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
        {}
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(2)
    },
    header: {
        margin: theme.spacing(1)
    },
    buttonOpenDrawer: {
        float: "right"
    },
    buttonCloseDrawer: {
        margin: `${theme.spacing(1)}px 0`
    },
    drawerContent: {
        minWidth: "25vw"
    }
}))

function RoutePlayground({ route }) {
    const classes = useStyles()
    const [source, setSource] = useState(null)
    const [responses, setResponse] = useState({})
    const [showDrawer, setShowDrawer] = useState(false)
    const [isRequesting, setIsRequesting] = useState(false)

    const [parameters, setParameters] = useState([])
    const [queryStrings, setQueryStrings] = useState([])
    const [headers, setHeaders] = useState([])
    const [body, setBody] = useState({})

    const setState = useMemo(
        () => ({
            parameters: setParameters,
            queryStrings: setQueryStrings,
            headers: setHeaders
        }),
        [route.__id]
    )

    const handleChangeJsonBody = useCallback(content => {
        try {
            const body = JSON.parse(content)
            const currentRouteId = getCurrentActiveRouteId()
            if (currentRouteId) {
                updateRouteBodyJson(currentRouteId, body)
                setBody(body)
            }
        } catch (e) {
            // invalid json
        }
    }, [])

    useEffect(() => {
        const stored = getRouteArguments(route.__id)
        const storedParamsItems = stored.parameters.map(p => p.name)
        route.parameters
            .filter(p => !storedParamsItems.includes(p))
            .forEach(param => {
                addRouteArgumentItem(route.__id, "parameters", {
                    __id: generateFieldId(),
                    name: param,
                    value: ""
                })
            })
    }, [route.__id])

    useEffect(() => {
        const stored = getRouteArguments(route.__id)
        setState.parameters(format.parameters(route, stored.parameters))
        setState.queryStrings(format.queryStrings(route, stored.queryStrings))
        setState.headers(format.headers(route, stored.headers))
        setBody(stored.body)
    }, [route.__id])

    const openDrawer = useCallback(() => setShowDrawer(true), [])
    const handlCloseDrawer = useCallback(() => setShowDrawer(false), [])

    const handleEditArgument = useCallback(
        (type, field, id, value) => {
            updateRouteArgumentItem(route.__id, type, id, field, value)
            const stored = getRouteArguments(route.__id)
            setState[type](format[type](route, stored[type]))
        },
        [route.__id]
    )

    const handleAddArgument = useCallback(
        type => {
            addRouteArgumentItem(route.__id, type, {
                __id: generateFieldId()
            })
            const stored = getRouteArguments(route.__id)
            setState[type](format[type](route, stored[type]))
        },
        [route.__id]
    )

    const handleMakeRequest = useCallback(() => {
        setIsRequesting(true)
        const sourceToken = axios.CancelToken.source()
        setSource(sourceToken)
        axios({
            method: route.http_verb.toLowerCase(),
            url: formatUrl(route.url, parameters),
            params: formatArguments(queryStrings),
            headers: formatArguments(headers),
            data: body,
            cancelToken: sourceToken.token
        })
            .then(response => {
                setResponse({ ...responses, [route.__id]: response })
                setIsRequesting(false)
            })
            .catch(() => {
                setIsRequesting(false)
            })
    }, [route.__id, parameters, queryStrings, headers, body])

    const handleCancelRequest = useCallback(() => {
        source && source.cancel()
    }, [source])

    useEffect(() => {
        setIsRequesting(false)
        source && source.cancel()
    }, [route.__id])

    useEffect(() => () => source && source.cancel(), [])

    return (
        <Fragment>
            <Paper className={classes.paper} elevation={0}>
                <Typography variant="h5" className={classes.header}>
                    <ChipHttpVerb verb={route.http_verb} />
                    {route.uri}
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.buttonOpenDrawer}
                        onClick={openDrawer}
                    >
                        Route info
                    </Button>
                </Typography>
            </Paper>
            <RequestArea
                onMakeRequest={handleMakeRequest}
                onCancelRequest={handleCancelRequest}
                onAddArgument={handleAddArgument}
                onChangeJsonBody={handleChangeJsonBody}
                onEditArgument={handleEditArgument}
                isRequesting={isRequesting}
                parameters={parameters}
                queryStrings={queryStrings}
                headers={headers}
                jsonBody={body}
            />
            <ResponseArea
                response={responses[route.__id]}
                isRequesting={isRequesting}
            />
            <DrawerRoute
                showDrawer={showDrawer}
                handleCloseDrawer={handlCloseDrawer}
                route={route}
            />
        </Fragment>
    )
}

RoutePlayground.propTypes = {
    route: routePropType.isRequired
}

export default RoutePlayground
