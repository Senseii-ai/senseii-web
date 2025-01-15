import { AppError, Result } from "@senseii/types";

export const httpGet = async<T>(url: string, token?: string): Promise<Result<T>> => {
  try {
    // FIX: Add a wrapper for missing secret keys.
    // FIX: Add a way to send cookies by default.
    const fetchUrl = `${process.env.BACKEND_URL}/${url}`
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
