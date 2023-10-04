import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'lib/schema.graphql',
  generates: {
    '../../libs/common/src/lib/schema.auto-generated.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
