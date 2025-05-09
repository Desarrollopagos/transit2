export interface ContextType {
  currSymbol: string
  currValue: number
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
  rtl: boolean
  setRtl: React.Dispatch<React.SetStateAction<boolean>>
  setCurrValue: React.Dispatch<React.SetStateAction<number>>
  setCurrSymbol: React.Dispatch<React.SetStateAction<string>>
  t: any
  textRtlStyle: any
  imageRtlStyle: any
  viewRtlStyle: any
  viewSelfRtlStyle: any
  token: any
  setToken: any
  accountDetail: any
  setAccountDetail: any
  documentDetail: any
  setDocumentDetail: any
  vehicleDetail: any
  setVehicleDetail: any
}
