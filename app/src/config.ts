// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

import { config } from 'jovo-framework';

export = config({
  logging: {
    request: true,
    styling: true,
  },

  intentMap: {
    'AMAZON.StopIntent': 'END',
  },

  db: {
    FileDb: {
      pathToFile: './../../db/db.json',
    },
  },
});
