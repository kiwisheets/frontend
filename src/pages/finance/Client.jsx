import React from 'react';
import { useParams } from 'react-router-dom';
import { Fade } from '@material-ui/core';

import ClientComponent from 'components/Client';

const Client = () => {
  const { id } = useParams();

  return (
    <Fade in>
      <ClientComponent edit id={id} />
    </Fade>
  );
};

export default Client;
