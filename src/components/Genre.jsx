

export function Genre() {

    return (
        <>
            <section className="playlist-section">
            <form className="create-playlist">
                    <h3>Select a Genre</h3>
                    <select name="genre">
                        {/* TODO  */}
                    </select>
                    <input type="text" name="song" placeholder="Name your playlist" aria-placeholder="Name placeholder"/>
                    <button type="submit">Generate Playlist!</button>
                </form>
            </section>
        </>
    )
}

export default Genre;








