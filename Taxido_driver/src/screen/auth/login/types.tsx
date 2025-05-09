interface LoginViewProps {
  googleLogin?: () => void
  appleLogin?: () => void
  gotoOTP?: () => void
  gotoRegistration?: () => void
  phoneNumber?: string
  setPhoneNumber?: string
  countryCode?: string
  setCountryCode?: string
  demouser?: string
  setDemouser?: () => void
}
export default LoginViewProps
