import axios, { AxiosResponse } from "axios";
import { IUser } from "@/models/useModels";
import { API_BASE_URL } from "./baseApiUrl";

export async function handleRequest<T>(
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

// Function to register a user
export async function registerUser(userData: IUser) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data; // Assuming the API returns user data upon successful registration
  } catch (error) {
    throw error;
  }
}

export async function loginUser(credentials: IUser) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // Assuming the API returns an authentication token upon successful login
  } catch (error) {
    throw error;
  }
}

/* const userLoginCredentials = {
  email: "example_user",
  password: "password123",
};
try {
  const authToken = await loginUser(userLoginCredentials);
  console.log("User logged in. Auth Token:", authToken);
} catch (error) {
  console.error("Login failed:", error);
} */
