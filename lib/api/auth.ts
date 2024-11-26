import { ApiError, CreateUserRequest, HTTP, ResultCode, UserLoginDTO, userLoginResponseDTO } from "@senseii/types";
import { axiosInstance } from "./http";

export const apiEndpoints = {
  signUp: {
    response: ResultCode.UserCreated
  },
  signIn: {
    response: userLoginResponseDTO
  }
}

// TODO: Error handling here?
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
      const response = await axiosInstance.post("/auth/login", creds)
      if (response.status === HTTP.STATUS.OK) {
        const validResult = apiEndpoints.signIn.response.safeParse(response.data.data)
        if (!validResult.success) {
          throw validResult.error
        }
        return validResult.data
      }
    } catch (error) {
      console.error("error calling api", error)
      throw error
    }
  }
}
