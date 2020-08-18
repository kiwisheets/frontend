import React from 'react';
import { render } from '@testing-library/react';
import SnackbarAlert from './SnackbarAlert';

test('renders snackbar', () => {
  const { getByText } = render(<SnackbarAlert open onClose={() => {}} severity="info" message="Hello World" />);
  getByText(/Hello World/i);
});
