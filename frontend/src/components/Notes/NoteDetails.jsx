
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const NoteDetails = () => {

    const { id } = useParams();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getNote = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.get(
                `${API_URL}/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNote(response.data.data);

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to fetch note"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNote();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!note) return <p>Note not found</p>;

    return (
        <div>
            <h1>{note.heading}</h1>
            <p>{note.content}</p>
        </div>
    );
};

export default NoteDetails;
