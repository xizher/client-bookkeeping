import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import {
  ViewHome,
  ViewTable,
  ViewAdd,
} from '../views'

interface IRoute {
  path: string
  component (): JSX.Element
}

function MainRouter () : JSX.Element {

  const routes : IRoute[] = [
    { path: '/home', component: ViewHome },
    { path: '/table', component: ViewTable },
    { path: '/add', component: ViewAdd },
  ]

  return (
    // <Router>
    <Switch>
      { routes.map((route, index) => (
        <Route
          key={ index }
          path={ route.path }
          component={ route.component }
        >
        </Route>
      )) }
    </Switch>
    // </Router>
  )
}

export default MainRouter
