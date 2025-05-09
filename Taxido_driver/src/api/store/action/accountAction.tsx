import {
  UPDATEPROFILE,
  SELF,
  DELETE_ACCOUNT,
  SELF_DRIVER,
  USER_BANKDETAILS,
  UPDATE_DOCUMENT,
  UPDATE_VEHICLE
} from '../types/index'
import { accountServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BankDetailsinterface, updateVehicleInterface } from '../../interface/accountInterface'

export const selfData = createAsyncThunk(SELF, async () => {
  const response = await accountServices.selfData()
  if (response.status == 200) {
    return response?.data
  } else {
    return 'Error'
  }
})

export const selfDriverData = createAsyncThunk(SELF_DRIVER, async () => {
  const response = await accountServices.selfDriverData()
  return response?.data
})

export const updateProfile = createAsyncThunk(UPDATEPROFILE, async data => {
  const response = await accountServices.updateProfile(data.data)
  if (response.status == 200) {
    data.dispatch(selfData())
    return response?.data
  } else {
    return 'Error'
  }
})

export const deleteProfile = createAsyncThunk(DELETE_ACCOUNT, async () => {
  const response = await accountServices.deleteProfile()
  if (response.status == 200) {
    return response?.data
  } else {
    return 'Error'
  }
})


export const updateBankDetails = createAsyncThunk(
  USER_BANKDETAILS,
  async (data: BankDetailsinterface) => {
    const response = await accountServices.updateBankDetails(data)
    if (response.status == 200) {
      return response?.data
    } else {
      return response.data
    }
  },
)


export const updateDocument = createAsyncThunk(
  UPDATE_DOCUMENT,
  async (data: BankDetailsinterface) => {
    const response = await accountServices.updateDocument(data)
    if (response.status == 200) {
      return response?.data
    } else {
      return response.data
    }
  },
)



export const updateVehicle = createAsyncThunk(
  UPDATE_VEHICLE,
  async (data: updateVehicleInterface) => {
    const response = await accountServices.updateVehicleRegis(data)
    if (response.status == 200) {
      return response?.data
    } else {
      return response.data
    }
  },
)
