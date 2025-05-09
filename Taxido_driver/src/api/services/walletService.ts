import {
  riderWallet,
  payment,
  plan_purchase,
  verify_payment,
  withdraw,
  withdrawRequest,
} from '../endpoints/walletEndpoint'
import {
  PaymentVerifyInterface,
  PurchasePlanDataInterface,
  WithdrawDataInterface,
} from '../interface/walletInterface'
import { GET_API, POST_API } from '../methods'

export const walletData = async () => {
  return GET_API(riderWallet)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const paymentData = async () => {
  return GET_API(payment)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const withdrawRequestData = async () => {
  return GET_API(withdrawRequest)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const purchaseData = async (data: PurchasePlanDataInterface) => {
  return POST_API(data, plan_purchase)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const paymentVerify = async (data: PaymentVerifyInterface) => {
  return POST_API(data, verify_payment)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const withdrawData = async (data: WithdrawDataInterface) => {
  return POST_API(data, withdraw)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

const walletServices = {
  walletData,
  paymentData,
  purchaseData,
  paymentVerify,
  withdrawData,
  withdrawRequestData,
}
export default walletServices
