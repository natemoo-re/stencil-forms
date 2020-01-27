import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'app',
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  outputTargets:[
    { type: 'docs-readme' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
