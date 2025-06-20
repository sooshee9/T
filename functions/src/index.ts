/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import next from 'next';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '../.next' } });
const handle = app.getRequestHandler();

export const nextjsServer = functions.https.onRequest((req, res) => {
  app.prepare().then(() => {
    handle(req, res);
  });
});
