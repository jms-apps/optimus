import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/test-helpers';

describe('Add inventory', () => {
  it('should add all the details successfully and display alert, hide alert when hide button is clicked', async () => {
    renderWithRouter('/add-inventory', { withLogin: true });

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'test-title' },
    });
    fireEvent.change(screen.getByLabelText('Barcode Number'), {
      target: { value: 1111 },
    });
    fireEvent.change(screen.getByLabelText('Retail Price'), {
      target: { value: 11.5 },
    });
    fireEvent.change(screen.getByLabelText('Purchase Price'), {
      target: { value: 10.5 },
    });
    fireEvent.change(screen.getByLabelText('Stock Level'), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByLabelText('Available units'), {
      target: { value: 80 },
    });
    fireEvent.change(screen.getByLabelText('Minimum Level'), {
      target: { value: 10 },
    });

    fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

    expect(await screen.findByText('My Inventory')).toBeInTheDocument();
    expect(await screen.findByText('Inventory added')).toBeInTheDocument();

    fireEvent.click(await screen.findByLabelText('close alert'));
    expect(screen.queryByText('Inventory added')).not.toBeInTheDocument();
  });

  it('should not submit when mandatory details are missing and should display error', async () => {
    renderWithRouter('/add-inventory', { withLogin: true });
    expect(screen.queryByText('Please enter title')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /ADD/i }));

    expect(await screen.findByText('Please enter title')).toBeInTheDocument();
    expect(await screen.findByText('Add Inventory')).toBeInTheDocument();
  });

  describe('Menu', () => {
    it('should display menu', async () => {
      renderWithRouter('/add-inventory', { withLogin: true });
      expect(screen.queryByLabelText('profile-menu')).toBeInTheDocument();
    });

    it('should redirect to login page if logout is clicked', async () => {
      renderWithRouter('/add-inventory', { withLogin: true });
      expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('profile-menu'));
      fireEvent.click(await screen.findByText('Logout'));

      expect(
        await screen.findByRole('button', { name: 'Login' })
      ).toBeInTheDocument();
    });

    it('should redirect to my inventory page if view inventory is clicked', async () => {
      renderWithRouter('/add-inventory', { withLogin: true });
      expect(screen.queryByText(/My Inventory/i)).not.toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('inventory-menu'));
      fireEvent.click(await screen.findByText(/View Inventory/i));

      expect(await screen.findByText(/My Inventory/i)).toBeInTheDocument();
    });

    it('should redirect to add inventory page if add inventory is clicked', async () => {
      renderWithRouter('/my-inventory', { withLogin: true });
      expect(screen.queryByText(/Add Inventory/i)).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('inventory-menu'));
      fireEvent.click(await screen.findByText(/Add Inventory/i));

      expect(await screen.findByText(/Add Inventory/i)).toBeInTheDocument();
    });
  });
});
