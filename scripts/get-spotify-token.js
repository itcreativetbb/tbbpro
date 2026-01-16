import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch';

const app = express();
const port = 8000;

// Your Spotify app credentials from environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8000/callback';
const SCOPE = 'user-read-currently-playing user-read-playback-state user-read-recently-played';

// Generate a random state
const state = crypto.randomBytes(16).toString('hex');

app.get('/', (_req, res) => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&state=${state}`;
    
    res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            })
        });

        const data = await response.json();
        res.send(`
            <h1>Success!</h1>
            <p>Your refresh token is:</p>
            <pre>${data.refresh_token}</pre>
            <p>Copy this token and paste it in your .env file as SPOTIFY_REFRESH_TOKEN</p>
        `);
    } catch (error) {
        res.send('Error getting token: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`
Server is running at http://localhost:${port}
1. Make sure you have set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your environment
2. Open your browser and visit http://localhost:${port}
3. Log in to Spotify when prompted
4. Copy the refresh token that appears and add it to your .env file
`);
});