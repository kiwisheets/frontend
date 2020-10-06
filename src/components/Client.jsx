import React from 'react';
import { string } from 'prop-types';
import { useQuery } from '@apollo/client';
import {
  Card, CardContent, CardHeader, Divider, Fade, Grid, Typography,
} from '@material-ui/core';

import { CLIENT } from 'graphql/Queries';
import { Skeleton } from '@material-ui/lab';
import { Row, Col } from './Grid';

const Client = (props) => {
  const { id } = props;

  const { data, loading, error } = useQuery(CLIENT, {
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
  });

  const title = () => {
    if (loading) {
      return <Skeleton />;
    } if (error) {
      return 'Failed to load';
    }
    return data.client.name;
  };

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={title()}
          subheader="Client"
        />
        <Divider />
        <CardContent>
          <Row>
            {error
              ? (
                <Col xs={12}>
                  error
                </Col>
              )
              : (
                <>
                  <Col md={6}>
                    Website:
                    <Typography>
                      {loading ? <Skeleton /> : data.client.website}
                    </Typography>
                  </Col>
                  <Col md={6}>
                    VAT(GST) Number:
                    <Typography>
                      {loading ? <Skeleton /> : data.client.vatNumber}
                    </Typography>
                  </Col>
                  <Col md={6}>
                    Business Number:
                    <Typography>
                      {loading ? <Skeleton /> : data.client.businessNumber}
                    </Typography>
                  </Col>
                  <Col md={6}>
                    Phone Number:
                    <Typography>
                      {loading ? <Skeleton /> : data.client.phone}
                    </Typography>
                  </Col>
                </>
              )}
          </Row>
        </CardContent>
      </Card>
    </Fade>
  );
};

Client.propTypes = {
  id: string.isRequired,
};

export default Client;
