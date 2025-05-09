import {
  USER_LOGIN,
  USER_REGISTRATION,
  VERIFY_OTP,
  SELF,
  USER_LOGIN_MAIL,
} from '../types/index'
import {
  DriverLoginInterface,
  DriverRegistrationPayload,
  VerifyOtpInterface,
  UserLoginEmailInterface,
} from '../../interface/authInterface'
import { authServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  USER_LOGIN,
  async (data: DriverLoginInterface) => {
    const response = await authServices.userLogin(data)
    return response?.data
  },
)

export const userVerifyOtp = createAsyncThunk(
  VERIFY_OTP,
  async (data: VerifyOtpInterface) => {
    const response = await authServices.userVerifyOtp(data)

    return response?.data
  },
)

export const userRegistration = createAsyncThunk(
  USER_REGISTRATION,
  async (data: DriverRegistrationPayload) => {
    const response = await authServices.userRegistration(data)
    if (response.status == 200) {
      return response?.data
    } else {
      return response.data
    }
  },
)

export const self = createAsyncThunk(SELF, async () => {
  const response = await authServices.self()
  if (response.status == 200) {
    return response?.data
  } else {
    return response.data
  }
})

export const userMailLogin = createAsyncThunk(
  USER_LOGIN_MAIL,
  async (data: UserLoginEmailInterface) => {
    const response = await authServices.userMailLogin(data)
    return response?.data
  },
)
