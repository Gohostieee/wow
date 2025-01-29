(async () => {
    const mockttp = require('mockttp');
    const admin = require('firebase-admin');
    const os = require('os');


    // Initialize Firebase Admin SDK


    // Create a proxy server with a self-signed HTTPS CA certificate:
    const server = mockttp.getLocal({
        https: {
            key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtmcZ/DtSzXe+O
MRzZngSdV0+NYEvsW0hikflKFixq14V8BNnvM1hIpEe4In1qWRB06YywKwmFCEYt
2rWwzanX4kmztmDpPgTydC19QecqwTh3mnqrdAYYSPVyE+4zbu7KQ5ddDH3ixI5l
1FxGaXnyFOjITNnhg2Zuf1nhb7hv75LALByF/eXuptDobAZDbV0446UfVB3cmPdT
v+o3KE59en7xaXtd4VV4xIxC6PBGV604W5fXUJ5nUnKdWnhhcvgWmUzy3MeaP5mZ
/exn11GnoPXN4ChBEpqxuJqYrcVKJ0mDDf2Jsvuw23etRRxEAB3X2imIGsTzOY3c
J1cM0RJrAgMBAAECggEAKJ7t4ncu8BWP4168mHMwMzzl4Xfh7Blj86Sih2Ju3EU3
99AOyrjh9IV0PrLbU9IpVqH7iJFZdeZ8vWgK0aceEeTiSAnp3Unk0HK83i1YkRmL
Q/lCsPHCJ1aTEDF3sFNJzsxIE77DihdiFpO9T8CIh0u7OHs7FFix1DM6bdS9fHtY
kU87xTGdFdIDX7zIJ+jtvSz2EaqiKrfna3nOYHDPZbCg5i0F7mX2GsoD07HKkkX2
dyUs5wSsDK0aSRGXqvfdUwz7rQ91vNUwT2YkxkIEDaO6zG+ESi+OLw+MYaRYof2o
7SQVvdFaWAVc+T6Bs1y+idqGyMW2y9P2R1qiK08KyQKBgQDjq1fNS1pUIuZgeY6H
EWjZhJft9YC1/+usTtHP3nQ3tYFIacv11xHf9NHlawrB6GVN5q4v79wvt0Ua9aM8
KW+2aaJyqHIr+iakRKrKY3ux1lVjIkN2s87XRvlu4AQe6+QIfLwTtslKHjvlen9W
PjWUXqSj3oh9zb+dkFyVDIu8zwKBgQDDNARJR2dAAWu29/xdlEJrzAXQdfRlQHz6
kLhzjeMNLIDbd9dHzW1XSXvqNS0WpNpwD6jDoi63wDWO+cSchCT5JG/arIYbJQxm
9VxpaOzSdKorao0KEUg7KxS4JY+nKfS+iEO+BVfnVl0L1hBLtYUPFLpPmk4Osgrf
bhUnTNvPpQKBgQDMUx1kuMjjk8LQOKfqnnxMI0y7GkcekAUxyjdQ6GPDD5lspM6Q
3ylCppSt4ghwiKJKbMpNaWZiSIezr1qFhuakfl91qal1wHZnnNzu8KO1shdF9h03
7h2nZSI9GL16BtjLqS6ePsCeTU4SIIMhookxlFMMYo564Wmj/kio1+6dTwKBgGb7
d1NtnzQuS7SAyhxYjl4uida7lA8i4YyTcyxLa8DUfLrMU8AmyYumUgByw3HR0QgT
ytZDJuB8QAVJEgf800C5j2VPZYTGm+9pfLKDz4UMVYaINRZdnbzRcqHf9xSa1ur6
GrsSOJjsgDQxX/GBN0yIg+5hGtM37PKJMhHEw6adAoGBAKvlyNG0q8HMxnAeyjVI
FBNdRXPwICLgupOgOgdRxG1KCZt9Y6jjcNHMUZ+Gl2JSdRrlpg0jIEUp38zQRij4
HBh7jKyO9tXUqWpHxwdxKbsvNlpuKf/pga0yKOfKDU6a6q4JdC2d4iwdQF+2cN5j
eSWyH6UxwbHn1ApcbORCZQWf
-----END PRIVATE KEY-----
`,
            cert: `-----BEGIN CERTIFICATE-----
MIIDMzCCAhugAwIBAgIUZiZu86rjZ6ewsND7hvYhDtKqMtkwDQYJKoZIhvcNAQEL
BQAwKTELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk1BMQ0wCwYDVQQDDARNT1RTMB4X
DTI1MDEyODIyNTMwM1oXDTM1MDEyNjIyNTMwM1owKTELMAkGA1UEBhMCVVMxCzAJ
BgNVBAgMAk1BMQ0wCwYDVQQDDARNT1RTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
MIIBCgKCAQEArZnGfw7Us13vjjEc2Z4EnVdPjWBL7FtIYpH5ShYsateFfATZ7zNY
SKRHuCJ9alkQdOmMsCsJhQhGLdq1sM2p1+JJs7Zg6T4E8nQtfUHnKsE4d5p6q3QG
GEj1chPuM27uykOXXQx94sSOZdRcRml58hToyEzZ4YNmbn9Z4W+4b++SwCwchf3l
7qbQ6GwGQ21dOOOlH1Qd3Jj3U7/qNyhOfXp+8Wl7XeFVeMSMQujwRletOFuX11Ce
Z1JynVp4YXL4FplM8tzHmj+Zmf3sZ9dRp6D1zeAoQRKasbiamK3FSidJgw39ibL7
sNt3rUUcRAAd19opiBrE8zmN3CdXDNESawIDAQABo1MwUTAdBgNVHQ4EFgQUNPLv
eduy8kB8dRQ0/cmIjJ+lHyIwHwYDVR0jBBgwFoAUNPLveduy8kB8dRQ0/cmIjJ+l
HyIwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAeKFXxt3G8qx7
t68U5VG9ILqGgPJ10mlVBjiUmB8EFi2iklXZe79/iG7AGYw1p8SvlF0/SJMSEci3
/Q9nOVkmVOIBIbrrxCjk9Ew5MBxH6oNUN2Tmbp//YE7uYSOjk0ItWsrGO3Jm7+U1
Q9/qq1vGZ0HKxNyI47/H19JhVkFzSEXWDhlh8bQGBRmDoT30u8M4e9qBVOMGuHij
jCG4G33xaQhigMRMq0WLB4PXKkn+nSpTUoX7nd7btu+DUVL/EyokZKGn8+PTFZFo
wnb155Prg4OIztMm0nu+3fymFmuQsqxOP9o7cSke14QER6t33etRJ5QS0XCK5pYm
dbIu/5YW1Q==
-----END CERTIFICATE-----
`
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
    await server.start(parseInt(process.env.PORT, 10) || 3000);

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