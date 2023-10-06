import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/test-helpers';

import { server } from '../mocks/server';

describe('Add inventory', () => {
  beforeAll(() => {
    return server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should add all the details successfully', async () => {
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

    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('My Inventory')).toBeInTheDocument();
  });
  //   it('should not submit is mandatory details are missing', () => {});
  //   it('should display error when add inventory failed', () => {});
});
