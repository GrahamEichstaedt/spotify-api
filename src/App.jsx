import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import dotenv from 'dotenv';



/**
 * ! Authorization here is happening with implicit grant, which is not secure.
 * ! Final version should shift to use Auth Code with PKCE
 * 
 * 
 * 
 */


const clientId = '639f7c7cd27f4319b81a04aa568bce96';
const redirectUri = "https://localhost:8080/callback";



let state = generateRandomString(16);

localStorage.setItem("stateKey", state);
let scope = 'user-read-private user-read-email ugc-image-upload playlist-read-private playlist-read-public playlist-modify-private playlist-modify-public user-library-modify user-library-read';

let url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&clientId=" + encodeURIComponent(clientId);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirectUri);
url += "&state=" + encodeURIComponent(state);

        /**
         * Generates a random string containing numbers and letters
         * @param  {number} length The length of the string
         * @return {string} The generated string
         */
        function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
