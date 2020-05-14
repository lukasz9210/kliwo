import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App.js'

const Routes = () => {
    return (
        <BrowserRouter basename="/wyszukiwarka">
            <Switch>
                <Route exact path="/" component={App} />
                {/* <Route exact path="/other-page" component={OtherComponent} /> */}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes