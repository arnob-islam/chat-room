import React from 'react'
import { Redirect, Route, } from 'react-router-dom'
import { UseGlobalContext } from './../Provider/Anonymus';

const PrivetRoute = ({ component: Component, ...rest }) => {
    const { userisok } = UseGlobalContext()

    return (<Route {...rest} render={props => {
        return userisok ? <Component {...props} /> : <Redirect to='/login/' />
    }} >
    </Route>)

    // return (
    //     userisok ? (<Route {...rest}>{(props) => <Component {...props} />} </Route>) : (<Redirect to='/login/' />)
    // )


}

export default PrivetRoute
