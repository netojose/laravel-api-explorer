import React, { Fragment } from "react"
import PropTypes from "prop-types"

import RouteActions from "../RouteActions"
import { getColorByHttpVerb } from "../../utils"

export default class RouteArea extends React.Component {
    render() {
        const { route, handleOpenDrawer } = this.props
        return !route ? (
            <div className="card bg-light m-3 text-center">
                <div className="card-body">
                    <p>No route selected</p>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleOpenDrawer}
                    >
                        select a route on routes list
                    </button>
                </div>
            </div>
        ) : (
            <div className="row">
                {route.description && (
                    <div className="col-sm-12">
                        <h4>{route.description}</h4>
                    </div>
                )}
                <div className="col-sm-12">
                    <h6>
                        <span
                            className={`badge badge-${getColorByHttpVerb(
                                route.http_verb
                            )}`}
                        >
                            {route.http_verb}
                        </span>{" "}
                        {route.uri}
                    </h6>
                    <RouteActions route={route} />
                </div>
            </div>
        )
    }
}

RouteArea.propTypes = {
    route: PropTypes.object
}
