import axios, { AxiosResponse } from "axios";
import { IJournalEntry } from "@/models/journalModels";
import { API_BASE_URL } from "./baseApiUrl";

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      throw new Error(errorData?.error || "An unknown error occurred");
    }
    throw new Error("An unknown error occurred");
  }
}

export async function fetchData(url: string): Promise<any> {
  return handleRequest(axios.get(url));
}

export async function addJournal(quizData: IJournalEntry) {
  const authToken = localStorage.getItem("authorizationToken");
  const url = `${API_BASE_URL}/api/journal`;

  try {
    await handleRequest(
      axios.post(url, quizData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
      })
    );
    console.log("Quiz added successfully");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to get all journal entries
export async function getAllJournals() {
  const authToken = localStorage.getItem("authorizationToken");
  const url = `${API_BASE_URL}/api/journal`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Assuming the response contains an array of journal entries
      const journalEntries = response.data;
      return journalEntries;
    } else {
      // Handle other response status codes if needed
      console.error("Received a non-OK response:", response);
      return null; // Return null or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or throw an error, depending on your requirements
  }
}

// Function to get single journal entry
export async function getJournal(journalId: string) {
  const authToken = localStorage.getItem("authorizationToken");
  const url = `${API_BASE_URL}/api/journal/${journalId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Assuming the response contains an array of journal entries
      const journalEntries = response.data;
      return journalEntries;
    } else {
      // Handle other response status codes if needed
      console.error("Received a non-OK response:", response);
      return null; // Return null or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or throw an error, depending on your requirements
  }
}

export async function deleteJournal(journalId: string) {
  const authToken = localStorage.getItem("authorizationToken");
  const url = `${API_BASE_URL}/api/journal/${journalId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: authToken,
      },
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Assuming the response contains an array of journal entries
      const journalEntries = response.data;
      return journalEntries;
    } else {
      // Handle other response status codes if needed
      console.error("Received a non-OK response:", response);
      return null; // Return null or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or throw an error, depending on your requirements
  }
}

export async function editJournal(journalId: string, quizData: IJournalEntry) {
  const authToken = localStorage.getItem("authorizationToken");
  const url = `${API_BASE_URL}/api/journal/${journalId}`;

  try {
    const response = await axios.put(url, quizData, {
      headers: {
        Authorization: authToken,
      },
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Assuming the response contains an array of journal entries
      const journalEntries = response.data;
      return journalEntries;
    } else {
      // Handle other response status codes if needed
      console.error("Received a non-OK response:", response);
      return null; // Return null or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or throw an error, depending on your requirements
  }
}
