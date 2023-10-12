import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/test-helpers';
import { VALID_TOKEN_VALUE } from '../mocks/handlers';

describe('Login', () => {
  it('should login successfully and should add token in local storage', async () => {
    renderWithRouter('/login');

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@email.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'test-password' },
    });

    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('My Inventory')).toBeInTheDocument();

    expect(localStorage.getItem('token')).toEqual(VALID_TOKEN_VALUE);
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
