import {
  RIDEREQUEST,
  DRIVERRIDEREQUEST,
  ACCEPTRIDEREQUEST,
} from '../types/index'
import { rideRequestService } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { DriverRideRequest } from '../../interface/rideRequestInterface'

export const rideRequestDataGet = createAsyncThunk(
  RIDEREQUEST,
  async (zone_id: number) => {
    const response = await rideRequestService.rideRequestValue(zone_id)

    return response?.data
  },
)

export const driverRequestDataGet = createAsyncThunk(
  DRIVERRIDEREQUEST,
  async (data: DriverRideRequest) => {
    const response = await rideRequestService.driverRequestValue(data)
    return response?.data
  },
)

export const acceptRequestValue = createAsyncThunk(
  ACCEPTRIDEREQUEST,
  async (data: DriverRideRequest) => {
    const response = await rideRequestService.acceptRequestValue(data)
    return response?.data
  },
)
