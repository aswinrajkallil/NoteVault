const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (path, options = {})=>{
    // options = {} provides a default empty object when no request options are passed.
    // It allows us to specify method, headers, and body when needed.
    const accessToken =  localStorage.getItem("accessToken")
    const headers = new Headers(options.headers);

    headers.set("Authorization", `Bearer ${ accessToken }`);

    const response = await fetch(`${API_URL}/api${path}`, {
        ...options,
        headers
    });

    if(response.status !== 401){
        return response
    }
    const refreshResponse = await fetch(`${API_URL}/api/refresh`,{
        method:'POST',
        credentials: "include"
    })

    if(!refreshResponse.ok){
        localStorage.removeItem('accessToken')
        throw new Error("Session expired. Please log in again.")
        
    }
    const data = await refreshResponse.json()

    localStorage.setItem("accessToken",data.accessToken)
} 