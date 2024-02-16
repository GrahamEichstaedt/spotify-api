/* eslint-disable react/prop-types */
import { Song } from "./Song";
import { Genre } from "./Genre";
import { Playlist } from "./Playlist";

export function Sidebar({ setActiveSection }) {

    const handleClick = (section) => {
        setActiveSection(section);
    }

    return (
        <>
            <aside className="sidebar">
                <div className="title">

                    <h3>Create playlists for spotify</h3>
                </div>
                <nav className="sidenav">
                    <ul className="nav-list">
                        <li className="nav-list-item"
                            onClick={
                                () => handleClick(<Song />)
                            }
                        >Song to Playlist</li>
                        <li className="nav-list-item"
                            onClick={
                                () => handleClick(<Playlist />)
                            }
                        >Playlist to Playlist</li>
                        <li className="nav-list-item"
                            onClick={
                                () => handleClick(<Genre />)
                            }
                        >Genre to Playlist</li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;