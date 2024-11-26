import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// export const httpGet = async (url: string) => {
//   try {
//     const response = await fetch(url, {
//       method: 'GET'
//     })
//     if (!response.ok) {
//       console.error(response.status)
//     }
//     return await response.json()
//   } catch (error) {
//     console.error('Error doing fetch get', error)
//   }
// }
