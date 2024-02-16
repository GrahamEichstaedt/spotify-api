import { useState } from 'react'
import { Genre } from "./components/Genre";
import { Playlist } from "./components/Playlist";
import { Result } from "./components/Result";
import { Sidebar } from "./components/Sidebar";
import { Song } from "./components/Song";
import { Title } from "./components/Title";
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
// let scope = 'user-read-private user-read-email ugc-image-upload playlist-read-private playlist-read-public playlist-modify-private playlist-modify-public user-library-modify user-library-read';
let scope = "playlist-read-private playlist-modify-private playlist-modify-public streaming user-read-private"


localStorage.setItem("stateKey", state);

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(clientId);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirectUri);
url += '&state=' + encodeURIComponent(state);

console.log(url);

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
  const [ activeSection, setActiveSection ] = useState(<Song />);

  return (
      <>
        <Sidebar setActiveSection={setActiveSection} />
        <main id="main-content">
          <Title />
          {activeSection}
        </main>
      </>
  )
}

export default App
