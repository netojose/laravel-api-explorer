import React, { Fragment } from "react"
import PropTypes from "prop-types"

import { getColorByHttpVerb } from "../../utils"

export default class RoutesList extends React.Component {
    onClickRoute = id => {
        this.props.handleClickRoute(id)
    }

    renderRoute(route, selected) {
        return (
            <button
                className={`btn btn-link list-group-item list-group-item-action${
                    selected ? " list-group-item-primary" : ""
                }`}
                key={route.__id}
                onClick={() => this.onClickRoute(route.__id)}
                disabled={!route.exists}
            >
                <div className="form-group mb-0">
                    <span
                        className={`badge badge-${getColorByHttpVerb(
                            route.http_verb
                        )}`}
                    >
                        {route.http_verb}
                    </span>
                    <span
                        className={`btn-sm text-${
                            route.exists ? "primary" : "danger"
                        }`}
                        aria-describedby={`route-${route}`}
                    >
                        {route.uri}
                    </span>
                    <small
                        id={`route-${route}`}
                        className="form-text text-muted"
                    >
                        {route.description}
                    </small>
                </div>
            </button>
        )
    }

    render() {
        const {
            routes,
            filterTerm,
            onChangeFilter,
            selectedRouteId
        } = this.props
        return (
            <Fragment>
                <div className="form-group">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        value={filterTerm}
                        onChange={onChangeFilter}
                    />
                </div>

                <div>
                    <div className="list-group list-group-flush">
                        {routes.map(route =>
                            this.renderRoute(
                                route,
                                route.__id === selectedRouteId
                            )
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

RoutesList.propTypes = {
    routes: PropTypes.array.isRequired,
    handleClickRoute: PropTypes.func.isRequired,
    selectedRouteId: PropTypes.string
}
