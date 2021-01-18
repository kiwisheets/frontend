import React from 'react';

import {
  Fade,
  Paper,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { PREVIEW_INVOICE } from 'graphql/Queries';
import { FullPanelSpinner } from 'components/lib';

const Invoices = () => {
  const { data, loading, error } = useQuery(PREVIEW_INVOICE);

  console.log(loading, data, error);

  return (
    <Fade in>
      <Paper>
        {loading
          && (
            <FullPanelSpinner />
          )}
        {data && (
          <iframe title="invoicepreview" srcDoc={data.previewInvoice} width="100%" height="1000px" />
        )}
        {error && (
          <p style={{
            color: 'red',
          }}
          >
            Error:
            {' '}
            {error.message}
          </p>
        )}
      </Paper>
    </Fade>
  );
};

export default Invoices;
