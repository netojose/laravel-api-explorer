import React, { Fragment } from "react"
import PropTypes from "prop-types"

const ListItem = ({
    handleDelete,
    handleChangeName,
    handleChangeValue,
    item,
    disableAddAndRemove
}) => (
    <div className="row">
        <div className="col mb-1">
            <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Name"
                value={item.name}
                disabled={!!item.disabledName}
                onChange={e => {
                    handleChangeName(e, item)
                }}
            />
        </div>
        <div className="col">
            <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Value"
                value={item.value}
                onChange={e => {
                    handleChangeValue(e, item)
                }}
            />
        </div>
        <div className="col">
            <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                    handleDelete(item)
                }}
            >
                Remove
            </button>
        </div>
    </div>
)

const ParametersInputList = ({
    items,
    disableAddAndRemove,
    handleAdd,
    handleDelete,
    handleChangeName,
    handleChangeValue
}) => (
    <Fragment>
        {items.map(item => (
            <ListItem
                key={item.id}
                handleDelete={handleDelete}
                handleChangeName={handleChangeName}
                handleChangeValue={handleChangeValue}
                item={item}
                disableAddAndRemove={disableAddAndRemove}
            />
        ))}
        {!disableAddAndRemove && (
            <button
                type="button"
                onClick={handleAdd}
                className="btn btn-sm btn-primary mt-3"
            >
                Add
            </button>
        )}
    </Fragment>
)

ParametersInputList.defaultProps = {
    disableAddAndRemove: false
}

ParametersInputList.propTypes = {
    items: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangeName: PropTypes.func.isRequired,
    handleChangeValue: PropTypes.func.isRequired,
    disableAddAndRemove: PropTypes.bool.isRequired
}

export default ParametersInputList
