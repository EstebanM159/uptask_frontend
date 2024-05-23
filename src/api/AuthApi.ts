import { isAxiosError } from 'axios'
import api from '@/lib/axios'
import { CheckPasswordForm, ConfirmToken, ConfirmTokenPassword, ForgotPasswordForm, NewPasswordFormT, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from '../types'

export async function createAccount (formData: UserRegistrationForm) {
  try {
    const { data } = await api.post<string>('/auth/create-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function confirmAccount (token:ConfirmToken) {
  try {
    const { data } = await api.post<string>('/auth/confirm-account', token)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function requestConfirmationCode (email:RequestConfirmationCodeForm) {
  try {
    const { data } = await api.post<string>('/auth/request-code', email)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function authenticateUser (formData: UserLoginForm) {
  try {
    // Esto devuelve un token el cual se guarda en el localStorage
    const { data } = await api.post<string>('/auth/login', formData)
    // Si esta todo ok mantendo la sesion iniciada con el localStorage
    localStorage.setItem('AUTH_TOKEN', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function forgotPassword (formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<string>('/auth/forgot-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function validateToken (formData: ConfirmTokenPassword) {
  // Validar si el token le pertenece al usuario que lo solicito
  try {
    const { data } = await api.post<string>('/auth/validate-token', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function updatePasswordWithToken ({ formData, token }: {formData:NewPasswordFormT, token: ConfirmToken['token']}) {
  try {
    const url = `/auth/update-password/${token}`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUser () {
  try {
    const { data } = await api('/auth/user')
    const response = userSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function checkPassword (formData:CheckPasswordForm) {
  try {
    const url = '/auth/check-password'
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
