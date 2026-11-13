
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Notes = () => {

    const [content, setContent] = useState([]);
    const [error, setError] = useState("");

    const getNotes = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await axios.get(
                `${API_URL}/api/notes`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            setContent(response.data.data);

        } catch (e) {
            setError(
                e.response?.data?.message || "Something went wrong"
            );
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div>
            <h1>My Notes</h1>

            {error && <p>{error}</p>}

            {content.length === 0 && !error && (
                <p>No notes found</p>
            )}

            {content.map((note) => (
                <div key={note._id}>

                    <Link to={`/notes/${note._id}`}>
                        <h3>{note.heading}</h3>
                    </Link>

                    <p>{note.content}</p>

                </div>
            ))}

        </div>
    );
};

export default Notes;
