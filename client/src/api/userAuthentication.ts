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
    const response = await axios.post(
      `${API_BASE_URL}/users/register`,
      userData
    );
    return response.data; // Assuming the API returns user data upon successful registration
  } catch (error) {
    throw error;
  }
}

export async function loginUser(credentials: IUser) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/login`,
      credentials
    );
    return response.data; // Assuming the API returns an authentication token upon successful login
  } catch (error) {
    throw error;
  }
}

export function isUserLoggedIn(): boolean {
  // Check if the authentication token is present in local storage
  const authToken = localStorage.getItem("authorizationToken");

  // Return true if the token exists and is not empty, indicating the user is logged in
  return !!authToken;
}

export async function getUserLoginInfo() {
  try {
    // Assuming you have an authentication token stored in local storage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // Handle the case where the user is not authenticated
      throw new Error("User is not authenticated");
    }

    // Make an Axios GET request to your user info endpoint with the authentication token
    const response = await axios.get("https://your-api-url.com/user-info", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors, e.g., redirect to the login page or show an error message
    console.error("Failed to retrieve user info:", error);
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
