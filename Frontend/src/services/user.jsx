const API = "https://boardify-cmdu.onrender.com/api";

export async function UserLogin({ login }) {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(login),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function Logout() {
  try {
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 2000));
    const response = await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch logout.");
  }
}

export async function CreateAcount({ user }) {
  try {
    const response = await fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function UpadetAccount({ id, data }) {
  try {
    const response = await fetch(`${API}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetUser({ id }) {
  try {
    const result = await fetch(`${API}/users/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function CreateUserFiles(formData) {
  try {
    const response = await fetch(`${API}/userFiles`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetUserFile(file) {
  try {
    const result = await fetch(file);
    const data = await result.blob();
    const objectFile = URL.createObjectURL(data);
    return objectFile;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
