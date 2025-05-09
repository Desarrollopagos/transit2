import {
  editProfile,
  userSelf,
  deleteAccount,
  driverSelf,
  editBank,
  documentUpdate,
  updateVehicleRegi,
} from '../endpoints/accountEndPoint'
import { BankDetailsinterface, updateVehicleInterface } from '../interface/accountInterface'
import { GET_API, PUT_API, DELETE_API, POST_API } from '../methods'

export const selfData = async () => {
  return GET_API(userSelf)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const selfDriverData = async () => {
  return GET_API(driverSelf)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const updateProfile = async data => {
  return PUT_API(editProfile, data)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const deleteProfile = async () => {
  return DELETE_API(deleteAccount)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const updateBankDetails = async (data: BankDetailsinterface) => {
  return POST_API(data, editBank)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const updateDocument = async (data: BankDetailsinterface) => {
  return POST_API(data, documentUpdate)
    .then(res => {
      return res
    })
    .catch(e => {
      return e?.response
    })
}

export const updateVehicleRegis = async (data: updateVehicleInterface) => {
  return POST_API(data, updateVehicleRegi)
    .then(res => {
      return res;
    })
    .catch(e => {
      return e?.response;
    });
};

const accountServices = {
  selfData,
  selfDriverData,
  updateProfile,
  deleteProfile,
  updateBankDetails,
  updateDocument,
  updateVehicleRegis,
}
export default accountServices
