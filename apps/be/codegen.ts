import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'lib/schema.graphql',
  generates: {
    './lib/schema.auto-generated.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
