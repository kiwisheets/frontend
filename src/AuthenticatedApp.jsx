import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Proptypes from 'prop-types';
import ErrorBoundary from 'react-error-boundary';
import { Fade, Container, makeStyles } from '@material-ui/core';

import * as colours from 'styles/colours';

import AppNavigation from 'components/AppNavigation';

import NotFoundPage from 'pages/NotFound';
import { FullPanelSpinner } from 'components/lib';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const ProfilePage = React.lazy(() => import('pages/Profile'));
const FinancePage = React.lazy(() => import('pages/FinancePage'));

const useErrorFallbackStyles = makeStyles(() => ({
  root: {
    color: colours.danger, fontSize: '0.7em',
  },
  pre: {
    display: 'inline-block',
    overflow: 'scroll',
    margin: '0',
    marginBottom: -5,
  },
}));

const ErrorFallback = ({ error }) => {
  const classes = useErrorFallbackStyles();
  return (
    <div role="alert" className={classes.root}>
      <span>There was an error:</span>
      {' '}
      <pre
        className={classes.pre}
      >
        {error.message}
      </pre>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: Proptypes.shape({
    message: Proptypes.string,
  }),
};

ErrorFallback.defaultProps = {
  error: {
    message: '',
  },
};

const AuthenticatedApp = (props) => {
  const { onLogout } = props;
  return (
    <BrowserRouter>
      <Fade in>
        <>
          <AppNavigation onLogout={onLogout}>
            <Container maxWidth="xl">
              <React.Suspense fallback={<FullPanelSpinner />}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Switch>
                    <Route path="/" component={DashboardPage} exact />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/finance" component={FinancePage} />
                    <Route path="*" component={NotFoundPage} />
                  </Switch>
                </ErrorBoundary>
              </React.Suspense>
            </Container>
          </AppNavigation>
        </>
      </Fade>
    </BrowserRouter>
  );
};

AuthenticatedApp.propTypes = {
  onLogout: Proptypes.func.isRequired,
};

export default AuthenticatedApp;
