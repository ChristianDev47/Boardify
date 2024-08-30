const API = "https://boardify-cmdu.onrender.com/api";

export async function CreateBoard({ board }) {
  try {
    const response = await fetch(`${API}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(board),
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

export async function CreateList({ list }) {
  try {
    const response = await fetch(`${API}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(list),
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
export async function CreateCard({ card }) {
  try {
    const response = await fetch(`${API}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(card),
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

export async function GetBoardsByUser({ iduser }) {
  try {
    const result = await fetch(`${API}/boards/user/${iduser}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetBoardById({ id }) {
  try {
    const result = await fetch(`${API}/boards/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetListsByBoard({ boardId }) {
  try {
    const result = await fetch(`${API}/lists/board/${boardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function UpdateList({ id, data }) {
  try {
    const response = await fetch(`${API}/lists/${id}`, {
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

export async function UpdateBoard({ id, data }) {
  try {
    const response = await fetch(`${API}/boards/${id}`, {
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

export async function GetCardByList({ listId }) {
  try {
    const result = await fetch(`${API}/cards/list/${listId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetCardById({ cardId }) {
  try {
    const result = await fetch(`${API}/cards/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function UpdateCards({ id, data }) {
  try {
    const response = await fetch(`${API}/cards/${id}`, {
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

export async function GetCardActivity({ cardId }) {
  try {
    const result = await fetch(`${API}/cardActivities/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function GetListActivity({ listId }) {
  try {
    const result = await fetch(`${API}/listActivities/${listId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function GetBoardActivity({ boardId }) {
  try {
    const result = await fetch(`${API}/boardActivities/${boardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetLabelByCard({ cardId }) {
  try {
    const result = await fetch(`${API}/cardLabels/card/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function CreateLabel({ label }) {
  try {
    const response = await fetch(`${API}/cardLabels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(label),
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

export async function GetLabelById({ id }) {
  try {
    const result = await fetch(`${API}/cardLabels/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function UpdateLabel({ id, data }) {
  try {
    const response = await fetch(`${API}/cardLabels/${id}`, {
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

export async function DeleteLabel({ id }) {
  try {
    const response = await fetch(`${API}/cardLabels/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function DeleteCard({ id }) {
  try {
    const response = await fetch(`${API}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function GetCheckItemsByCard({ cardId }) {
  try {
    const result = await fetch(`${API}/checkItems/card/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function CreateCheckItem({ checkItem }) {
  try {
    const response = await fetch(`${API}/checkItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(checkItem),
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

export async function UpdateCheckItem({ id, data }) {
  try {
    const response = await fetch(`${API}/checkItems/${id}`, {
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
export async function GetCheckItemById({ id }) {
  try {
    const result = await fetch(`${API}/checkItems/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function CreateCardFiles(formData) {
  try {
    const response = await fetch(`${API}/cardFiles`, {
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

export async function GetCardFilesByCard({ cardId }) {
  try {
    const result = await fetch(`${API}/cardFiles/card/${cardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetCardFile(file) {
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

export async function UpdateCardFile({ id, data }) {
  try {
    const response = await fetch(`${API}/cardFiles/${id}`, {
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

export async function DeleteCardFile({ id }) {
  try {
    const response = await fetch(`${API}/cardFiles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function DeleteList({ id }) {
  try {
    const response = await fetch(`${API}/lists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function DeleteCheckItem({ id }) {
  try {
    const response = await fetch(`${API}/checkItems/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function CreateBoardFiles(formData) {
  try {
    const response = await fetch(`${API}/boardFiles`, {
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

export async function GetBoardFilesByBoard({ boardId }) {
  try {
    const result = await fetch(`${API}/boardFiles/board/${boardId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetBoardFile(file) {
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

export async function UpdateBoardFile({ id, data }) {
  try {
    const response = await fetch(`${API}/boardFiles/${id}`, {
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

export async function DeleteBoardFile({ id }) {
  try {
    const response = await fetch(`${API}/boardFiles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function DeleteBoard({ id }) {
  try {
    const response = await fetch(`${API}/boards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export async function CreateInvitation({ invitation }) {
  try {
    const response = await fetch(`${API}/invitations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(invitation),
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

export async function GetInvitationByCredential({ token }) {
  try {
    const result = await fetch(`${API}/invitations/link/${token}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetInvitationById({ id }) {
  try {
    const result = await fetch(`${API}/invitations/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function GetBoardsByMember({ memberId }) {
  try {
    const result = await fetch(`${API}/boards/member/${memberId}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
