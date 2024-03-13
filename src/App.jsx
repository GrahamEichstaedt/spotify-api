import { useState, useEffect, useRef } from "react";
import { Genre } from "./components/Genre";
import { Playlist } from "./components/Playlist";
import { Result } from "./components/Result";
import { Sidebar } from "./components/Sidebar";
import { Song } from "./components/Song";
import { Title } from "./components/Title";
import { Home } from "./components/Home";
import "./App.css";
// import dotenv from 'dotenv';

/**
 * Authorization Code with PKCE Flow
 *
 * Authorization for devices where client secrets cannot be safely stored.
 * Four Steps:
 *  1. Code Challenge generation from a Code Verifier
 *  2. Request authorization from the user and retrieve the authorization code
 *  3. Request an access token from the authorization code.
 *  4. Finally use the access token to make API calls.
 *
 *
 *
 */

/**
 * STEP 1. - CODE VERIFIER
 *
 * The PKCE authorization flow starts with creation of a code verifier.
 * According to the PKCE standard, a code verifier is a high-entropy
 * cryptographic random string with a length between 43 and 128 characters
 * (the longer the better). It can contain letters, digits, underscores,
 * periods, hyphens, or tildes.
 *
 *
 *
 * @param {Number} length
 */
const generateRandomString = (length) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

/**
 * STEP 2. - CODE CHALLENGE
 *
 * Once the code verifier has been generated, we must transform (hash) it using
 * the SHA256 algorithm. This is the value that will be sent within the user
 * authorization request.
 *
 * Let's use window.crypto.subtle.digest to generate the value using the SHA256
 * algorithm from the given data
 *
 * @param {*} plain
 */
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

/**
 * Next, we'll implement a function base64encode that returns the base64
 * representation of the digest we just calculated with the sha256 function.
 *
 * @param {*} input
 */
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

/**
 * Putting all the pieces together.
 */
const codeVerifier = generateRandomString(64);
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);

const clientId = "639f7c7cd27f4319b81a04aa568bce96";
const redirectUri = "http://localhost:8080";
let scope =
  "playlist-read-private playlist-modify-private playlist-modify-public user-library-modify user-library-read";
const authUrl = new URL("https://accounts.spotify.com/authorize");

window.localStorage.setItem("code_verifier", codeVerifier);

const params = {
  response_type: "code",
  client_id: clientId,
  scope,
  code_challenge_method: "S256",
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

const getToken = async (code) => {
  // stored in previous step
  let codeVerifier = localStorage.getItem("code_verifier");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const url = "https://accounts.spotify.com/api/token";
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem("access_token", response.access_token);
};

// export default App;

export function App() {
  const [activeSection, setActiveSection] = useState(<div />);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('hasAuthorized');
    setIsAuthorized(storedAuth === 'true');
    console.log('Now authorized');
  }, []); // Empty dependency array to run only once when component mounts
  
  useEffect(() => {
    // Check if authorization code is available
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(`Code: ${code}`);
    if (code) {
      console.log(`Code exists - Running getToken()`);
      getToken(code);
    } else {
      // Redirect user to Spotify authorization page
      console.log(`Code does not exist - Running redirectToSpotifyAuthorization()`)
      redirectToSpotifyAuthorization();
    }
  }, []); // Empty dependency array to run only once when component mounts

  const redirectToSpotifyAuthorization = async () => {
    const clientId = "639f7c7cd27f4319b81a04aa568bce96";
    const redirectUri = "http://localhost:8080";
    const scope =
      "playlist-read-private playlist-modify-private playlist-modify-public user-library-modify user-library-read";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const getToken = async (code) => {
    // stored in previous step
    let codeVerifier = localStorage.getItem("code_verifier");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const url = "https://accounts.spotify.com/api/token"; 
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem("access_token", response.access_token);
    setIsAuthorized(true); // Update authorization status
  };

  useEffect(() => {
    if (isAuthorized) {
      setActiveSection(<Song />);
    }
  }, [isAuthorized]); // Run only when isAuthorized changes

  return (
    <>
      <Sidebar setActiveSection={setActiveSection} />
      <main id="main-content">
        <Title />
        {activeSection}
      </main>
    </>
  );
}

export default App;