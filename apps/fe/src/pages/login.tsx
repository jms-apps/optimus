import { Alert, Button, TextField } from '@mui/material';
import { PageContainer } from '../components/page-container';
import { Controller, useForm } from 'react-hook-form';
import { FormElement } from '../components/form-element';
import { useMutation } from 'react-query';
import { request, gql } from 'graphql-request';

type MutationLoginArgs = {
  email: string;
  password: string;
};

export function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(handleLogin, {
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
  const onSubmit = (data: any) => mutation.mutate(data);
  return (
    <PageContainer>
      <div className="fixed left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 w-80">
        <h1 className="p-2">Login</h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <FormElement>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Please enter email' }}
              render={({ field }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  {...field}
                  fullWidth
                />
              )}
            />

            {errors.email && (
              <Alert severity="error">{errors.email.message?.toString()}</Alert>
            )}
          </FormElement>

          <FormElement>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Please enter password' }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            {errors.password && (
              <Alert severity="error">
                {errors.password.message?.toString()}
              </Alert>
            )}
          </FormElement>

          <FormElement>
            <Button variant="contained" type="submit" className="">
              Login
            </Button>
          </FormElement>
        </form>
      </div>
    </PageContainer>
  );
}

async function handleLogin(input: MutationLoginArgs) {
  const { email, password } = input;
  const document = gql`
    mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        email
        token
      }
    }
  `;
  const headers = {
    'x-api-key': 'da2-5hzzedte4bd4jdzqv4e77v4moa',
  };

  const variables = {
    email,
    password,
  };
  const values = await request(
    'https://dev-api.sujanashah.com/graphql',
    document,
    variables,
    headers
  );
  console.log({ values });
}
