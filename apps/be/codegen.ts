
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "lib/schema.graphql",
  generates: {
    "./lib/schema.ts": {
      plugins: ["typescript"]
    }
  }
};

export default config;
