const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK using the service account key
const serviceAccount = require('./cs110-project-ecb22-firebase-adminsdk-qix3h-3b5bb56cbc.json'); // Update the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
