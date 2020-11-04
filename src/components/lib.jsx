import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

// import * as mq from 'styles/media-queries';
// import * as colors from 'styles/colours';

const useFullPageSpinnerStyles = makeStyles(() => ({
  root: {
    fontSize: '4em',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FullPageSpinner = () => {
  const classes = useFullPageSpinnerStyles();
  return (
    <div
      className={classes.root}
    >
      <CircularProgress />
    </div>
  );
};

const useFullPanelSpinnerStyles = makeStyles(() => ({
  root: {
    fontSize: '4em',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FullPanelSpinner = () => {
  const classes = useFullPanelSpinnerStyles();
  return (
    <div
      className={classes.root}
    >
      <CircularProgress />
    </div>
  );
};

export {
  FullPageSpinner,
  FullPanelSpinner,
};
