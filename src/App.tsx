import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom";
import routes from "application/routes";
import { QueryClientProvider, QueryClient } from "react-query";

import { AppLayout, Loader } from "application/components";
import { ROUTER_PATH_LIST } from "application/constants";
import { NotificationProvider } from "application/contexts";
import "App.scss";
const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
            <HashRouter basename="/">
              <AppLayout >
                <Suspense fallback={<Loader />}>
                  <Switch>
                    {routes.map(({ component: Component, ...rest }) => (
                      <Route
                        {...rest}
                        key={rest.path}
                        render={(props: any) => <Component {...props} />}
                        exact
                      />
                    ))}
                    <Redirect from="*" to={ROUTER_PATH_LIST.default} />
                  </Switch>
                </Suspense>
              </AppLayout>
            </HashRouter>
        </NotificationProvider>
      </QueryClientProvider>
  );
}

export default App;
