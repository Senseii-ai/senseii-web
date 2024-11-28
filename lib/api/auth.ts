import { ResultCode, SignUpFormSchema, UserLoginDTO, userLoginResponseDTO } from "@senseii/types";
import { axiosInstance, SuccessResponseSchema } from "./http";
import { z, ZodError } from "zod";

export const apiEndpoints = {
  signUp: {
    response: ResultCode.UserCreated
  },
  signIn: {
    response: userLoginResponseDTO
  }
}

export const authAPI = {
  signUp: async (data: SignUpFormSchema) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data)
      const successResponse = SuccessResponseSchema(z.string()).parse(response)
      return successResponse
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("", error.name)
        return null
      }
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
