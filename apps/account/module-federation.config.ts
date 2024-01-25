import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'account',
  exposes: {
    './Routes': 'apps/account/src/app/app.routes.ts',
  },
};

export default config;
