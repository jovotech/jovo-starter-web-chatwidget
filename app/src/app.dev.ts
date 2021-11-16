import { FileDb } from '@jovotech/db-filedb';
import { JovoDebugger } from '@jovotech/plugin-debugger';
import { app } from './app';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: v4.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    new FileDb({
      skipTests: true,
      pathToFile: '../db/db.json',
    }),
    new JovoDebugger(),
  ],
});

export * from './server.express';
