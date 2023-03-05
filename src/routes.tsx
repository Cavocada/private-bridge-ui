import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import pageURL from '_constants/pageURL';
import Transfer from '_src/pages/Transfer';

const routeMap = [
  {
    path: pageURL.home,
    component: Transfer,
    exact: true,
    dynamic: false,
  },
  // {
  //   path: pageURL.transfer,
  //   component: lazy(() => import(/* webpackChunkName: 'transfer' */ './pages/Transfer')),
  //   exact: true,
  //   dynamic: true,
  // },
  {
    path: '*',
    component: () => <div>404</div>,
    exact: true,
    dynamic: false,
  },
];

const Routes = () => {
  let location = useLocation();
  useEffect(() => {
    window.gtag('config', 'G-FR9CD5BXYH', {
      page_title: location.pathname,
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <Suspense fallback={null}>
      <Switch>
        {routeMap.map((item, index) => (
          <Route key={index} path={item.path} exact={item.exact} component={item.component} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
