import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

export default withModuleFederation({
  ...config,
  remotes: [
    ['inventory', 'https://zealous-sea-02c6b701e.4.azurestaticapps.net']
  ]
});
