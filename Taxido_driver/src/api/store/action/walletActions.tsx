import {
  WALLET,
  PAYMENT,
  PURCHASE_PLAN,
  VERIFY_PAYMENT,
  WITHDRAW_PAYMENT,
  WITHDRAE_REQUEST,
} from '../types/index'
import { walletServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  PaymentVerifyInterface,
  PurchasePlanDataInterface,
} from '../../interface/walletInterface'

export const walletData = createAsyncThunk(WALLET, async () => {
  const response = await walletServices.walletData()
  return {
    data: response?.data,
    status: response?.status,
  }
})

export const paymentsData = createAsyncThunk(PAYMENT, async () => {
  const response = await walletServices.paymentData()
  return response?.data
})

export const withdrawRequestData = createAsyncThunk(
  WITHDRAE_REQUEST,
  async () => {
    const response = await walletServices.withdrawRequestData()
    return response?.data
  },
)

export const purchaseData = createAsyncThunk(
  PURCHASE_PLAN,
  async (data: PurchasePlanDataInterface) => {
    const response = await walletServices.purchaseData(data)
    return response?.data
  },
)

export const paymentVerify = createAsyncThunk(
  VERIFY_PAYMENT,
  async (data: PaymentVerifyInterface) => {
    const response = await walletServices.paymentVerify(data)
    return response?.data
  },
)

export const withdrawData = createAsyncThunk(
  WITHDRAW_PAYMENT,
  async (data: PaymentVerifyInterface) => {
    const response = await walletServices.withdrawData(data)
    return response?.data
  },
)
