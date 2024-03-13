
export function Home() {

    return (
        <>
            <article className="page">
                <h1>Welcome to Playlistify!</h1>
                <h3>Create new customized spotify playlists</h3>

                <section className="playlist-section">
                    <p>Playlistify offers 3 new methods of creating playlists. There are three new create a playlist. Select a song you like, a genre you like, or another playlist you like and we will generate a brand new playlist based on your criteria. Click below to authenticate with Spotify.</p>
                    <button className="auth-btn" type="button">Get Started!</button>
                </section>
            </article>
        </>
    )
}

export default Home;