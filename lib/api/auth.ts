import {
  ResultCode,
  SignUpFormSchema,
  User,
  UserDTO,
  userDTOSchema,
  UserLoginDTO,
  UserLoginReponseDTO,
  userLoginResponseDTO
} from '@senseii/types'
import { axiosInstance, Result, SuccessResponseSchema } from './http'
import { z, ZodError } from 'zod'
import { infoLogger } from '../logger/logger'

export const apiEndpoints = {
  signUp: {
    response: userDTOSchema
  },
  signIn: {
    response: userLoginResponseDTO
  }
}

const OAuthLoginDTO = z.object({
  email: z.string().email(),
  name: z.string().optional()
})

type OAuthLogin = z.infer<typeof OAuthLoginDTO>

export const authAPI = {
  OAuthLogin: async (data: OAuthLogin) => {
    // return savedUser
    try {
      const savedUser: Result<UserLoginReponseDTO> = await axiosInstance.post('/auth/non-credentials', data)
      infoLogger({
        message: 'signin worked',
        status: 'success',
        layer: 'CONTROLLER',
        name: 'signin'
      })

      const successResponse =
        SuccessResponseSchema(userLoginResponseDTO).safeParse(savedUser)
      if (!successResponse.success) {
        infoLogger({
          message: successResponse.error.message,
          status: 'failed',
          layer: 'CONTROLLER',
          name: 'signin'
        })
      }
      return successResponse.data
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('validation error', error.message)
        return null
      }
      // error occured on the API layer.
      throw error
    }
  },
  signUp: async (data: SignUpFormSchema) => {
    try {
      infoLogger({
        message: 'singup flow',
        status: 'INFO',
        layer: 'ACTION',
        name: 'authAPI'
      })
      const response: Result<UserDTO> = await axiosInstance.post(
        '/auth/signup',
        data
      )
      if (!response.success) {
        throw response.error
      }
      return response
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('', error.message)
        return null
      }
      throw error
    }
  },
  signIn: async (creds: UserLoginDTO) => {
    try {
      const data = await axiosInstance.post('/auth/login', creds)
      infoLogger({
        message: 'signin worked',
        status: 'success',
        layer: 'CONTROLLER',
        name: 'signin'
      })
      const successResponse =
        SuccessResponseSchema(userLoginResponseDTO).safeParse(data)
      if (!successResponse.success) {
        infoLogger({
          message: 'signin failed',
          status: 'success',
          layer: 'CONTROLLER',
          name: 'signin'
        })
      }
      return successResponse.data
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('validation error', error.message)
        return null
      }
      // error occured on the API layer.
      throw error
    }
  },
  verifyEmail: async (token: string): Promise<Result<String>> => {
    try {
      // TODO: change this to verify-email
      const response: Result<String> = await axiosInstance.post("/auth/verify-email", { token: token })
      if (!response.success) {
        throw response
      }
      return response
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("", error.message)
      }
      throw error
    }
  }
}
