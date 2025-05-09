import { createSlice } from '@reduxjs/toolkit'
import {
  rideDataGet,
  rideStartData,
  rideDataPut,
  rideDataGets,
} from '../action/rideAction'
import { RideInterface } from '../../interface/rideInterface'

const initialState: RideInterface = {
  rideGet: [],
  rideGets: [],
  ridePost: [],
  rideUpdate: [],
  token: '',
  loading: false,
  success: false,
  fcmToken: '',
}

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(rideDataGet.pending, state => {
      state.loading = true
    })
    builder.addCase(
      rideDataGet.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.rideGet = action.payload
        state.loading = false
      },
    )
    builder.addCase(rideDataGet.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(rideDataGets.pending, state => {
      state.loading = true
    })
    builder.addCase(
      rideDataGets.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.rideGets = action.payload
        state.success = true
      },
    )
    builder.addCase(rideDataGets.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(rideStartData.pending, state => {
      state.loading = true
    })
    builder.addCase(
      rideStartData.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.ridePost = action.payload.data
        state.loading = false
      },
    )
    builder.addCase(rideStartData.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(rideDataPut.pending, state => {
      state.loading = true
    })
    builder.addCase(
      rideDataPut.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.loading = false
        state.rideUpdate = action.payload
        state.loading = false
      },
    )
    builder.addCase(rideDataPut.rejected, state => {
      state.loading = false
      state.success = false
    })
  },
})
export default rideSlice.reducer
