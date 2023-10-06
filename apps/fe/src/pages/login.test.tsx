import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/test-helpers';

describe('Login', () => {
  it('should login successfully', async () => {
    renderWithRouter('/login');

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@email.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'test-password' },
    });

    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('My Inventory')).toBeInTheDocument();
  });
  it('should not submit when mandatory details are missing and should display error', async () => {
    renderWithRouter('/login');
    expect(screen.queryByText('Please enter email')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('Please enter email')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Login' })
    ).toBeInTheDocument();
  });
});
