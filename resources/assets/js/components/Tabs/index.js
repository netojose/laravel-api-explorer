import React from "react"
import PropTypes from "prop-types"

const Tabs = ({ items, value, onChange }) => (
    <div className="btn-group btn-group-sm" role="group">
        {Object.keys(items).map(key => (
            <button
                className={`btn btn-sm btn-${
                    value === key ? "secondary" : "light"
                }`}
                key={key}
                onClick={() => onChange(key)}
            >
                {items[key]}
            </button>
        ))}
    </div>
)

Tabs.propTypes = {
    items: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Tabs
