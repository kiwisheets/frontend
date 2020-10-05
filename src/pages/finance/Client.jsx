import React from 'react';
import { useQuery } from '@apollo/client';
import { CLIENT } from 'graphql/Queries';
import { useParams } from 'react-router-dom';

const Client = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CLIENT, {
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
  });
  return (
    <>
      {loading && (
      <h3>Loading</h3>
      )}
      {data && (
      <div>
        {data.client.name}
      </div>
      )}
    </>
  );
};

export default Client;
