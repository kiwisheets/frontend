import React from 'react';
import { Fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  const title = 'Dashboard';

  return (
    <Fade in>
      <div
        className={classes.root}
      >
        <div>
          <h1>{title}</h1>
        </div>
      </div>
    </Fade>
  );
};

export default DashboardPage;
