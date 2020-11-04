import React from 'react';
import { Fade } from '@material-ui/core';

const FinanceDashboard = () => {
  const title = 'Finances';
  return (
    <Fade in>
      <h1>{title}</h1>
    </Fade>
  );
};

export default FinanceDashboard;
