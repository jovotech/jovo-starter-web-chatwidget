// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

import { config } from 'jovo-framework';

export = config({
  logging: {
    request: true,
    response: true,
    styling: true,
  },

  db: {
    FileDb: {
      pathToFile: './../../db/db.json',
    },
  },
});
