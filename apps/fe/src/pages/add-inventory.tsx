import { Alert, Button, TextField } from '@mui/material';
import { PageContainer } from '../components/page-container';
import { Controller, useForm } from 'react-hook-form';
import { FormElement } from '../components/form-element';
import { useMutation } from 'react-query';
import { gql } from 'graphql-request';
import { optimusRequest } from '../helpers/request';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../components/page-title';
import { Inventory, MutationAddInventoryArgs } from '@optimus/common';

export function AddInventory() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(handleAddInventory, {
    onSuccess: () => {
      navigate('/my-inventory');
    },
  });
  const onSubmit = (data: any) => mutation.mutate(data);
  return (
    <PageContainer>
      <PageTitle title="Add Inventory" />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <FormElement>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Please enter title' }}
              render={({ field }) => (
                <TextField
                  label="Title"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.title && (
              <Alert severity="error">{errors.title.message?.toString()}</Alert>
            )}
          </FormElement>
          <FormElement>
            <Controller
              name="barcodeNumber"
              control={control}
              rules={{ required: 'Please enter Barcode Number' }}
              render={({ field }) => (
                <TextField
                  label="Barcode Number"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.barcodeNumber && (
              <Alert severity="error">
                {errors.barcodeNumber.message?.toString()}
              </Alert>
            )}
          </FormElement>
        </div>
        <div className="flex">
          <FormElement>
            <Controller
              name="retailPrice"
              control={control}
              rules={{ required: 'Please enter Retail Price' }}
              render={({ field }) => (
                <TextField
                  label="Retail Price"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.retailPrice && (
              <Alert severity="error">
                {errors.retailPrice.message?.toString()}
              </Alert>
            )}
          </FormElement>
          <FormElement>
            <Controller
              name="purchasePrice"
              control={control}
              rules={{ required: 'Please enter Purchase Price' }}
              render={({ field }) => (
                <TextField
                  label="Purchase Price"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.purchasePrice && (
              <Alert severity="error">
                {errors.purchasePrice.message?.toString()}
              </Alert>
            )}
          </FormElement>
        </div>
        <div className="flex">
          <FormElement>
            <Controller
              name="stockLevel"
              control={control}
              rules={{ required: 'Please enter Stock Level' }}
              render={({ field }) => (
                <TextField
                  label="Stock Level"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.stockLevel && (
              <Alert severity="error">
                {errors.stockLevel.message?.toString()}
              </Alert>
            )}
          </FormElement>
          <FormElement>
            <Controller
              name="available"
              control={control}
              rules={{ required: 'Please enter Available' }}
              render={({ field }) => (
                <TextField
                  label="Available units"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.available && (
              <Alert severity="error">
                {errors.available.message?.toString()}
              </Alert>
            )}
          </FormElement>
          <FormElement>
            <Controller
              name="minimumLevel"
              control={control}
              rules={{ required: 'Please enter Minimum Level' }}
              render={({ field }) => (
                <TextField
                  label="Minimum Level"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.minimumLevel && (
              <Alert severity="error">
                {errors.minimumLevel.message?.toString()}
              </Alert>
            )}
          </FormElement>
        </div>
        <FormElement>
          <Button variant="contained" type="submit" className="">
            Add
          </Button>
        </FormElement>
      </form>
    </PageContainer>
  );
}

async function handleAddInventory(input: MutationAddInventoryArgs) {
  const graphql = gql`
    mutation (
      $title: String!
      $barcodeNumber: Int
      $retailPrice: Float
      $purchasePrice: Float
      $stockLevel: Int!
      $available: Int!
      $minimumLevel: Int!
    ) {
      addInventory(
        title: $title
        barcodeNumber: $barcodeNumber
        retailPrice: $retailPrice
        purchasePrice: $purchasePrice
        stockLevel: $stockLevel
        available: $available
        minimumLevel: $minimumLevel
      ) {
        sku
      }
    }
  `;
  const {
    addInventory: { sku },
  } = await optimusRequest<{ addInventory: Inventory }>(graphql, input);
  return sku;
}
