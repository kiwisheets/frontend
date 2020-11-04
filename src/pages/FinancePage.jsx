import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FullPanelSpinner } from 'components/lib';
import NotFoundPage from './NotFound';

const FinanceDashboard = lazy(() => import('./finance/Dashboard'));

const ClientsDashboard = lazy(() => import('./finance/Clients'));
const CreateClient = lazy(() => import('./finance/CreateClient'));
const Client = lazy(() => import('./finance/Client'));

const InvoicesDashboard = lazy(() => import('./finance/Invoices'));

const FinancePage = () => (
  <Suspense fallback={<FullPanelSpinner />}>
    <Switch>
      <Route path="/finance" component={FinanceDashboard} exact />
      <Route path="/finance/clients/create" component={CreateClient} exact />
      <Route path="/finance/clients" component={ClientsDashboard} exact />
      <Route path="/finance/client/:id" component={Client} />
      <Route path="/finance/invoices" component={InvoicesDashboard} exact />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default FinancePage;
