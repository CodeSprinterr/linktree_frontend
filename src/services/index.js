//service/index.js
export const API_URL = import.meta.env.VITE_API_URL;

export async function registerService({ data }) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}


export async function login({ data }) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}

export async function setuserName({ username, category }) {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/setUserName`, {
        method: "POST",
        body: JSON.stringify({ username, category }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    return response;
}

export async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/getUser`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function uplodeDP(formData) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/uploadDP`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}

export async function removeDP() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/removeImage`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}

export async function saveDataPage1(data) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/saveDataPage1`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function getUrls() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/getUrls`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}

export async function updateProfile(data) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/auth/updateProfile`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function getUser(username) {
    const response = await fetch(`${API_URL}/user/getUser/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
}

export async function updateClicks(data) {
    const response = await fetch(`${API_URL}/user/updateClicks`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
}

export async function getAnalyticsData() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/getAnalyticsData`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}

export async function updateApperance(data) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/updateApperance`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}

export async function getApperance() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/user/getApperance`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}




