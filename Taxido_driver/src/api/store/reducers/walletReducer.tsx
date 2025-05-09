import { createSlice } from '@reduxjs/toolkit'
import {
  walletData,
  paymentsData,
  purchaseData,
  paymentVerify,
  withdrawData,
  withdrawRequestData,
} from '../action/walletActions'
import { WalletTypeInterface } from '../../interface/walletInterface'

const initialState: WalletTypeInterface = {
  walletTypedata: [],
  paymentMethodData: [],
  purchasePlanData: [],
  paymentVerifyData: [],
  withdrawAmountData: [],
  withdrawRequestValue: [],
  token: '',
  loading: false,
  success: false,
  fcmToken: '',
  statusCode: null,
}

const walletTypeSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(walletData.pending, state => {
      state.loading = true
    })
    builder.addCase(walletData.fulfilled, (state, action) => {
      state.walletTypedata = action.payload.data
      state.statusCode = action.payload.status
      state.loading = false
    })
    builder.addCase(walletData.rejected, (state, action) => {
      state.walletTypedata = action.payload.data
      state.statusCode = action.payload?.status || 500
      state.loading = false
      state.success = false
    })

    builder.addCase(paymentsData.pending, state => {
      state.loading = true
      state.success = false
    })
    builder.addCase(paymentsData.fulfilled, (state, action) => {
      state.paymentMethodData = action.payload
      state.loading = false
      state.success = true
    })
    builder.addCase(paymentsData.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(withdrawRequestData.pending, state => {
      state.loading = true
      state.success = false
    })
    builder.addCase(withdrawRequestData.fulfilled, (state, action) => {
      state.withdrawRequestValue = action.payload
      state.loading = false
      state.statusCode = action.payload.status
      state.success = true
    })
    builder.addCase(withdrawRequestData.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(purchaseData.pending, state => {
      state.loading = true
      state.success = false
    })
    builder.addCase(purchaseData.fulfilled, (state, action) => {
      state.purchasePlanData = action.payload
      state.loading = false
      state.success = true
    })
    builder.addCase(purchaseData.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(paymentVerify.pending, state => {
      state.loading = true
      state.success = false
    })
    builder.addCase(paymentVerify.fulfilled, (state, action) => {
      state.paymentVerifyData = action.payload
      state.loading = false
      state.success = true
    })
    builder.addCase(paymentVerify.rejected, state => {
      state.loading = false
      state.success = false
    })

    builder.addCase(withdrawData.pending, state => {
      state.loading = true
      state.success = false
    })
    builder.addCase(withdrawData.fulfilled, (state, action) => {
      state.withdrawAmountData = action.payload
      state.loading = false
      state.statusCode = action.payload.status
      state.success = true
    })
    builder.addCase(withdrawData.rejected, state => {
      state.loading = false
      state.success = false
    })
  },
})

export default walletTypeSlice.reducer
