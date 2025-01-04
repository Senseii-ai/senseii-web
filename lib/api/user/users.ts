import { infoLogger } from "@/lib/logger/logger";
import { axiosInstance, BaseURL, getAuthHeaders } from "../http";
import { IChat, Result, userDTOSchema } from "@senseii/types";
import { z } from "zod";
import { Session } from "next-auth";

export const apiEndpoints = {
  getUsers: {
    response: z.array(userDTOSchema)
  },
  signUp: {
    response: userDTOSchema
  }
}

export const userAPI = {
  getUserChats: async (session: Session): Promise<IChat[]> => {
    const { user: { email, accessToken } } = session
    const url = `${BaseURL}/chat/user/${email}/chats`
    infoLogger({ message: "get user chats", status: "INFO" })
    const response: Result<IChat[]> = await axiosInstance.get(url, { headers: { Authorization: getAuthHeaders(accessToken) } })
    if (!response.success) {
      return []
    }
    return response.data
  }
}
