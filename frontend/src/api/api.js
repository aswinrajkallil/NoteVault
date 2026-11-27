
const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (path, options = {}) => {

    // Function to send an API request
    const sendRequest = (token) => {
        const headers = new Headers(options.headers);

        headers.set("Authorization", `Bearer ${token}`);

        return fetch(`${API_URL}/api${path}`, {
            ...options,
            headers
        });
    };

    // Get access token from localStorage
    let accessToken = localStorage.getItem("accessToken");

    // First API request
    let response = await sendRequest(accessToken);

    // If token is valid, return the response
    if (response.status !== 401) {
        return response;
    }

    // If token expired, request a new access token
    const refreshResponse = await fetch(`${API_URL}/api/refresh`, {
        method: "POST",
        credentials: "include"
    });

    // If refresh token is invalid or expired
    if (!refreshResponse.ok) {
        localStorage.removeItem("accessToken");

        throw new Error("Session expired. Please log in again.");
    }

    // Get new access token from backend
    const data = await refreshResponse.json();

    // Update localStorage
    accessToken = data.accessToken;

    localStorage.setItem("accessToken", accessToken);

    // Retry the original API request
    response = await sendRequest(accessToken);

    return response;
};

export default apiFetch;
