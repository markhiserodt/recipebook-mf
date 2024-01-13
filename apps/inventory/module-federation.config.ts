import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'inventory',
  exposes: {
    './Routes': 'apps/inventory/src/app/app.routes.ts',
  },
};

export default config;
