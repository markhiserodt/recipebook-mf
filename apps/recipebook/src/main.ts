import { setRemoteDefinitions } from '@nx/angular/mf';
import { environment } from './environments/environment';

const moduleFederationManifest = environment.production ?
    '/assets/module-federation.prod.manifest.json' : 
    '/assets/module-federation.manifest.json'

fetch(moduleFederationManifest)
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
