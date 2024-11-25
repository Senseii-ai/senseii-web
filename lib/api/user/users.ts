import { axiosInstance } from "../http";
import { userDTOSchema } from "@senseii/types";
import { z } from "zod";

export const apiEndpoints = {
  getUsers: {
    response: z.array(userDTOSchema)
  },
  signUp: {
    response: userDTOSchema
  }
}

export const userAPI = {
  getAll: async () => {
    const response = await axiosInstance.get(`/users`)
    return apiEndpoints.getUsers.response.parse(response.data)
  },
  signUp: async () => {
    const response = await axiosInstance.post("/auth/signup")
    return apiEndpoints.signUp.response.parse(response.data)
  }
}
