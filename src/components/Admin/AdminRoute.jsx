import React from 'react'
import { Redirect, Route, } from 'react-router-dom'
import { UseGlobalContext } from './../Provider/Anonymus'

const PrivetRoute = ({ component: Component, ...rest }) => {
    const { globalAdmin } = UseGlobalContext()

    return (<Route {...rest} render={props => {
        return globalAdmin ? <Component {...props} /> : <Redirect to='/only/admin/login' />
    }} >
    </Route>)

}

export default PrivetRoute
