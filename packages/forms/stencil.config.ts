import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-form',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs', dir: '../../docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
