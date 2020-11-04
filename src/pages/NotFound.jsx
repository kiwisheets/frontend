import React from 'react';
import Proptypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, Fade, Card, CardContent, CardActions, Typography, makeStyles, Divider,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 175,
  },
  wrapper: {
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Fade in>
      <div
        className={classes.wrapper}
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              404
            </Typography>
            <Typography variant="h5" component="h2">
              Sorry nothing found here
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button component={RouterLink} to="/">
              Go home
            </Button>
          </CardActions>
        </Card>
      </div>
    </Fade>
  );
};

NotFoundPage.propTypes = {
  location: Proptypes.shape({
    pathname: Proptypes.string.isRequired,
  }).isRequired,
};

export default NotFoundPage;
