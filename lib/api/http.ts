import axios from "axios";

// In shared types package
import { z } from 'zod';
import { infoLogger } from "../logger/logger";

// TODO: Make this a shared interface.
const ZErrorCode = z.enum([
  'VALIDATION_ERROR',
  'CONFLICT_ERROR',
  'NOT_FOUND_ERROR',
  'INTERNAL_SERVER_ERROR'
])
const ZAppError = z.object({
  code: z.number(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.date()
})

export type AppError = z.infer<typeof ZAppError>
type ErrorCode = z.infer<typeof ZErrorCode>

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AppError }



// Generic Success Response Schema
export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  success: z.literal(true),
  data: dataSchema
});

// Generic Error Response Schema
const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  })
});

// Combined API Response Schema
const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([
    SuccessResponseSchema(dataSchema),
    ErrorResponseSchema
  ]);

// Example User Schema
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string()
});

// Authentication Response Schema
const AuthResponseSchema = ApiResponseSchema(
  z.object({
    token: z.string(),
    user: UserSchema
  })
);

export const BaseURL = process.env.NEXT_BACKEND_API_URL

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


const isAuthRoute = (route: string) => {
  const routeArray = route.split("/")
  if (routeArray.includes("login") || routeArray.includes("signup") || routeArray.includes("verify-email")) {
    return true
  }
}

export const getAuthHeaders = (token: string) => {
  return `Bearer ${token}`
}

/**
* Attaching axios tokens in case of any requests except auth.
*/

axiosInstance.interceptors.request.use(async (config) => {
  return config
}, (error) => {
  console.error("Error sending request")
  throw error
})

axiosInstance.interceptors.response.use((response) => {
  // 2xx response from the server.
  const data = response.data
  return data
}, (error) => {
  // error response from the server.
  if (error.response) {
    // error in response
    try {
      infoLogger({ message: "response was wrong", status: "failed", layer: "AXIOS" })
      const { success, error: { code, message, details } } = ErrorResponseSchema.parse(error.response.data)
      return Promise.reject({
        code: code,
        message: message,
        details: details,
        status: success
      });

    } catch (error) {
      console.error("error parsing login response", error)
      throw error
    }
  } else if (error.request) {
    // Some error while forming the request
    infoLogger({ message: "network error", status: "failed", layer: "AXIOS" })
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server',
      details: null
    });
  } else {
    infoLogger({ message: "other error", status: "failed", layer: "AXIOS" })
    console.error(error)
    // Something happened in setting up the request that triggered an Error
    return Promise.reject({
      code: 'REQUEST_SETUP_ERROR',
      message: 'Error preparing the API request',
      details: error.message
    });
  }
})
