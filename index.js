(async () => {
    const mockttp = require('mockttp');
    const admin = require('firebase-admin');
    const os = require('os');

    var serviceAccount = require("./mmm2-c6151-firebase-adminsdk-wmefo-3152ede0a5.json");
    // Initialize Firebase Admin SDK
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://mmm2-c6151-default-rtdb.firebaseio.com"
    });

    const database = admin.database();

    // Create a proxy server with a self-signed HTTPS CA certificate:
    const server = mockttp.getLocal({
        https: {
            keyPath: './key.pem',
            certPath: './cert.pem'
        }
    });

    // Log every request then pass through
    server.forAnyRequest().thenPassThrough({
        beforeRequest: async (request) => {
            console.log(`Received request for: ${request.url}`);

            // Send request data to Firebase Realtime Database
            try {
                //await database.ref('logs').push(requestData);
            } catch (error) {
                console.error('Error logging request data:', error);
            }

            return request;
        }
    });
    await server.start();

    // Get the local IP address
    const networkInterfaces = os.networkInterfaces();
    const localIp = Object.values(networkInterfaces)
        .flat()
        .find(details => details.family === 'IPv4' && !details.internal)
        ?.address;

    // Print out the server details:
    console.log(`Server running on port ${server.port}`);
    console.log(`Connect to the proxy server from your phone using IP: ${localIp}:${server.port}`);
})();