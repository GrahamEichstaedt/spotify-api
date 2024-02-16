
export function Song() {

    return (
        <>
            <section className="playlist-section">
                <form className="create-playlist">
                    <input type="search" name="song" placeholder="Enter a song" aria-placeholder="Enter a song"/>
                    <input type="text" name="song" placeholder="Name your playlist" aria-placeholder="Name your playlist"/>
                    <button type="submit">Generate Playlist!</button>
                </form>
            </section>
        </>
    )
}

export default Song;

