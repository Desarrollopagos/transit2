import { createSlice } from '@reduxjs/toolkit'
import {
  selfData,
  updateProfile,
  deleteProfile,
  selfDriverData,
  updateBankDetails,
  updateDocument,
  updateVehicle
} from '../action/accountAction'
import { doc } from '@react-native-firebase/firestore'

const initialState = {
  loading: false,
  self: null,
  selfDriver: null,
  BankDetailUpdate: [],
  VehicleRegisUpdate :[],
  documentUpdate: [],
  defaultAddress: null,
  accountDetails: null,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateDefaultAdd(state, action) {
      state.defaultAddress = action.payload
    },
    financialState(state, action) {
      state.val = action.payload
    },
    updateLoading(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: builder => {
    //Self Cases
    builder.addCase(selfData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(selfData.fulfilled, (state, action) => {
      state.self = action.payload
      action?.payload?.address?.map(item => {
        if (item.is_default == 1) state.defaultAddress = item
      })
      state.loading = false
    })
    builder.addCase(selfData.rejected, (state, action) => {
      state.loading = false
    })

    //Self Driver Cases
    builder.addCase(selfDriverData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(selfDriverData.fulfilled, (state, action) => {
      state.selfDriver = action.payload
      state.selfDriver = action.payload
      state.loading = false
    })
    builder.addCase(selfDriverData.rejected, (state, action) => {
      state.loading = false
    })

    //UpdateProfile Cases
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => { })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false
    })

    //DeleteProfile Cases
    builder.addCase(deleteProfile.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(deleteProfile.fulfilled, (state, action) => { })
    builder.addCase(deleteProfile.rejected, (state, action) => {
      state.loading = false
    })

    //update bankDetails
    builder.addCase(updateBankDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateBankDetails.fulfilled, (state, action) => {
      state.BankDetailUpdate = action.payload
      state.loading = false
    })
    builder.addCase(updateBankDetails.rejected, state => {
      state.loading = false
    })

   //update vehicleRegi
    builder.addCase(updateVehicle.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateVehicle.fulfilled, (state, action) => {
      state.VehicleRegisUpdate = action.payload
      state.loading = false
    })
    builder.addCase(updateVehicle.rejected, state => {
      state.loading = false
    })


    //update bankDetails
    builder.addCase(updateDocument.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateDocument.fulfilled, (state, action) => {
      state.documentUpdate = action.payload
      state.loading = false
    })
    builder.addCase(updateDocument.rejected, state => {
      state.loading = false
    })


  },
})

export const { updateDefaultAdd, financialState, updateLoading } =
  accountSlice.actions
export default accountSlice.reducer
