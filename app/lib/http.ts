import { AppError, Result } from "@senseii/types";
import { infoLogger } from "./logger";

const BE_URL = process.env.BACKEND_URL

export const httpGet = async<T>(url: string, token: string): Promise<Result<T>> => {
  try {
    // FIX: Add a wrapper for missing secret keys.
    // FIX: Add a way to send cookies by default.
    const fetchUrl = `${BE_URL}/${url}`
    console.log("Fetching from", fetchUrl)
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const data = await response.json()
      console.log("ERROR DATA", data)
      throw data
    }
    const finalResponse = await response.json()
    console.log("OK RESPONSE", finalResponse.data)
    return {
      success: true,
      data: finalResponse.data
    }

  } catch (error) {
    console.log("API error", error)
    return {
      success: false,
      error: error as AppError
    }
  }
}

export const httpPost = async<T>(url: string, token: string, body: Record<string, unknown>): Promise<Result<T>> => {
  try {
    const postUrl = `${BE_URL}/${url}`
    infoLogger({ message: `METHOD: POST URL: ${postUrl}`, status: "alert", layer: "API", name: "HTTP" })
    const response = await fetch(postUrl, {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      const data = await response.json()
      console.log("ERROR DATA", data)
      throw data
    }
    const finalResponse = await response.json()
    return {
      success: true,
      data: finalResponse.data
    }
  } catch (error) {
    return {
      success: false,
      error: error as AppError
    }
  }
}

export const BE_ROUTES = {
  createNewGoal: "user/goals/new",
  getUserGoals: "user/goals"
}
