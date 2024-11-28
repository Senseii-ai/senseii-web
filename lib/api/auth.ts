import { ApiError, CreateUserRequest, HTTP, ResultCode, UserLoginDTO, userLoginResponseDTO } from "@senseii/types";
import { axiosInstance, SuccessResponseSchema } from "./http";
import { ZodError } from "zod";

export const apiEndpoints = {
  signUp: {
    response: ResultCode.UserCreated
  },
  signIn: {
    response: userLoginResponseDTO
  }
}

export const authAPI = {
  signUp: async (data: CreateUserRequest) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data)
      if (response.status === HTTP.STATUS.OK) {
        return {
          resultCode: HTTP.STATUS.CREATED
        }
      }
      const responseData: ApiError = response.data
      return {
        resultCode: responseData.code,
        error: responseData.message
      }
    } catch (error) {
      console.error("error calling api", error)
      throw error
    }
  },
  signIn: async (creds: UserLoginDTO) => {
    try {
      const data = await axiosInstance.post("/auth/login", creds)
      const successResponse = SuccessResponseSchema(userLoginResponseDTO).parse(data)
      return successResponse.data

    } catch (error) {
      if (error instanceof ZodError) {
        console.error("validation error", error.name)
        return null
      }
      // error occured on the API layer.
      throw error
    }
  }
}
