import { infoLogger } from "@/lib/logger/logger";
import { axiosInstance, getAuthHeaders } from "../http";
import { IChat, Result, userDTOSchema } from "@senseii/types";
import { z } from "zod";
import { Session } from "next-auth";
import { Message } from "openai/resources/beta/threads/messages";

export const BaseURL = process.env.NEXT_BACKEND_API_URL

export const apiEndpoints = {
  getUsers: {
    response: z.array(userDTOSchema)
  },
  signUp: {
    response: userDTOSchema
  }
}

export interface ChatWithMessages {
  email: string,
  chatId: string,
  messages: Message[]
}

const layer = "API"
const name = "userAPI"

export const userAPI = {
  saveChat: async (session: Session, chat: IChat) => {
    const { user: { email, accessToken } } = session
    const url = `${BaseURL}/user/${email}/chat`
    const response = await axiosInstance.post(url, { chat: chat }, { headers: { Authorization: getAuthHeaders(accessToken) } })
    console.log("RESPOSE FOR SAVE CHAT", response.status, response.data)
    return response
  },
  deleteChat: async (session: Session, chatId: string): Promise<Result<boolean>> => {
    const { user: { email, accessToken } } = session
    const url = `${BaseURL}/chat/user/${email}/${chatId}`
    const response: Result<boolean> = await axiosInstance.delete(url, { headers: { Authorization: getAuthHeaders(accessToken) } })
    return response
  },
  deleteUserChats: async (session: Session): Promise<Result<boolean>> => {
    const { user: { email, accessToken } } = session
    const url = `${BaseURL}/chat/user/${email}`
    const response: Result<boolean> = await axiosInstance.delete(url, { headers: { Authorization: getAuthHeaders(accessToken) } })
    return response
  },
  getUserChats: async (session: Session): Promise<IChat[]> => {
    const { user: { email, accessToken } } = session
    const url = `${BaseURL}/chat/user/${email}/chats`
    infoLogger({ message: "get user chats", status: "INFO" })
    const response: Result<IChat[]> = await axiosInstance.get(url, { headers: { Authorization: getAuthHeaders(accessToken) } })
    if (!response.success) {
      return []
    }
    return response.data
  },
  getChatMessages: async (session: Session, chatId: string): Promise<IChat | null> => {
    const { user: { email, accessToken } } = session
    console.log("LOOKING FOR CHAT", chatId)
    const url = `${BaseURL}/chat/user/${email}/chat/${chatId}`
    const response: Result<IChat> = await axiosInstance.get(url, { headers: { Authorization: getAuthHeaders(accessToken) } })
    if (!response.success) {
      console.log("getChatMessages", response)
      return null
    }
    console.log("GOT CHATS", response.data)
    return response.data
  }
}
