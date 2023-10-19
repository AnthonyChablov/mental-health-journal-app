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
