import React from "react"
// import PropTypes from "prop-types"
// import { Button } from "evergreen-ui"
// import { Button } from "react-toolbox/lib/button"
import Button from "@material-ui/core/Button"

// const Button = ({ children }) => <button>{children}</button>
// Button.propTypes = {
//     children: PropTypes.node
// }

const App = () => (
    <Button variant="contained" color="primary">
        Test button
    </Button>
)

export default App

// import React, { Fragment } from "react"
// import hashSum from "hash-sum"
// import axios from "axios"
// import { css } from "emotion"

// import AppSettings from "../AppSettings"
// import TopBar from "../TopBar"
// import Modal from "../Modal"
// import RoutesList from "../RoutesList"
// import RouteArea from "../RouteArea"

// const drawerClass = css({
//     background: "#fff",
//     position: "fixed",
//     left: 0,
//     top: 0,
//     zIndex: 999,
//     overflowY: "auto",
//     width: 270,
//     height: "100vh",
//     padding: 5,
//     boxShadow: "none",
//     transform: "translateX(-270px)",
//     transition: "all 250ms ease-in-out",
//     "&.show": {
//         boxShadow: "11px 0px 70px 15px rgba(0,0,0,0.37)",
//         transform: "translateX(0px)"
//     }
// })

// const overlayClass = css({
//     width: "100vw",
//     height: "100vh",
//     position: "fixed",
//     width: "0vw",
//     height: "0vh",
//     zIndex: 998,
//     left: 0,
//     top: 0,
//     background: "#000",
//     transition: "opacity 350ms ease-in-out",
//     opacity: 0,
//     "&.show": {
//         width: "100vw",
//         height: "100vh",
//         opacity: 0.7
//     }
// })

// export default class App extends React.Component {
//     state = {
//         allRoutes: [],
//         filteredRoutes: [],
//         selectedRouteId: null,
//         filterTerm: "",
//         config: {},
//         settingsOpened: false,
//         drawerOpened: false
//     }

//     componentDidMount() {
//         axios.get(window.api_info_url).then(response => {
//             const { routes, config } = response.data
//             const allRoutes = this.setIds(routes)
//             const filteredRoutes = routes
//             this.setState({ allRoutes, filteredRoutes, config })
//         })
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const { drawerOpened } = this.state
//         if (drawerOpened === prevState.drawerOpened) {
//             return
//         }

//         if (drawerOpened) {
//             this.addEscHandlerCloseDrawer()
//         } else {
//             this.removeEscHandlerCloseDrawer()
//         }
//     }

//     componentWillUnmount() {
//         this.removeEscHandlerCloseDrawer()
//     }

//     addEscHandlerCloseDrawer() {
//         document.addEventListener(
//             "keydown",
//             this.handleEscToCloseDrawer.bind(this)
//         )
//     }

//     removeEscHandlerCloseDrawer() {
//         document.removeEventListener(
//             "keydown",
//             this.handleEscToCloseDrawer.bind(this)
//         )
//     }

//     handleEscToCloseDrawer(event) {
//         if (event.keyCode === 27) {
//             this.handleCloseDrawer()
//         }
//     }

//     setIds = routes => {
//         return routes.map(route => {
//             route.__id = "route_" + hashSum(route)
//             return route
//         })
//     }

//     getCurrentRoute = () => {
//         return this.state.allRoutes.find(
//             route => route.__id === this.state.selectedRouteId
//         )
//     }

//     handleOpenSettings = () => {
//         this.setState({ settingsOpened: true })
//     }

//     handleCloseSettings = () => {
//         this.setState({ settingsOpened: false })
//     }

//     handleOpenDrawer = () => {
//         this.setState({ drawerOpened: true })
//     }

//     handleCloseDrawer = () => {
//         this.setState({ drawerOpened: false })
//     }

//     handleClickRoute = selectedRouteId => {
//         this.handleCloseDrawer()
//         this.setState({ selectedRouteId })
//     }

//     handleChangeFilter = event => {
//         const filterTerm = event.target.value

//         const filteredRoutes = filterTerm
//             ? this.state.allRoutes.filter(
//                   item => item.uri.indexOf(filterTerm) !== -1
//               )
//             : [].concat(this.state.allRoutes)

//         this.setState({ filterTerm, filteredRoutes })
//     }

//     render() {
//         const {
//             filterTerm,
//             filteredRoutes,
//             selectedRouteId,
//             settingsOpened,
//             drawerOpened
//         } = this.state
//         return (
//             <Fragment>
//                 <div className={`${drawerClass}${drawerOpened ? " show" : ""}`}>
//                     <RoutesList
//                         handleClickRoute={this.handleClickRoute}
//                         filterTerm={filterTerm}
//                         onChangeFilter={this.handleChangeFilter}
//                         routes={filteredRoutes}
//                         selectedRouteId={selectedRouteId}
//                     />
//                 </div>
//                 <div
//                     className={`${overlayClass}${drawerOpened ? " show" : ""}`}
//                     onClick={this.handleCloseDrawer}
//                 />
//                 <Modal
//                     open={settingsOpened}
//                     onClose={this.handleCloseSettings}
//                     title="Settings"
//                 >
//                     <AppSettings />
//                 </Modal>
//                 <TopBar
//                     handleOpenSettings={this.handleOpenSettings}
//                     handleOpenDrawer={this.handleOpenDrawer}
//                 />
//                 <div className="container-fluid">
//                     <RouteArea
//                         route={this.getCurrentRoute()}
//                         handleOpenDrawer={this.handleOpenDrawer}
//                     />
//                 </div>
//             </Fragment>
//         )
//     }
// }
