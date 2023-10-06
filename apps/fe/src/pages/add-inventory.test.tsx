import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/test-helpers';

describe('Add inventory', () => {
  it('should add all the details successfully', () => {
    renderWithRouter('/add-inventory');

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
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByLabelText('Title')).toBeNull();
  });
  //   it('should not submit is mandatory details are missing', () => {});
  //   it('should display error when add inventory failed', () => {});
});
