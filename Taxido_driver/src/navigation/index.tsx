import React, { useEffect, useState } from 'react'
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { RootStack } from './main/RootStackNavigator'
import TabNav from './tabNavigator'
import {
  Login,
  Otp,
  DocumentVerify,
  VehicleRegistration,
  BankDetail,
  CreateAccount,
  OnBoarding,
  AddNewOffer,
  Chat,
  Settings,
  TopupWallet,
  MyWallet,
  ProfileSetting,
  AppSettings,
  MyRide,
  AcceptFare,
  ActiveRide,
  CompleteDetails,
  EndRide,
  Home,
  OtpRide,
  PendingDetails,
  Ride,
  RideComplete,
  RideDetails,
  VehicleDetail,
  BankDetails,
  DocumentDetail,
  Notification,
  Subscription,
  Splash,
  MapDetails,
  AddVehicle,
  VehicleList,
  LoginMail,
  OtpVerify,
  CreateTicket,
  SupportTicket,
  TicketDetails,
  RentalDetails,
  PaymentSelect,
  PaymentWebView,
  RideInfo,
  NoService,
} from '../screen'
import { useValues } from '../utils/context'
import { Map } from '../screen/mapView'
import appColors from '../theme/appColors'
import { NoInternet } from '../commonComponents/noInternet'
import NetInfo from '@react-native-community/netinfo';

function Navigation() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);
  const { isDark } = useValues()

  const DarkThemeValue = {
    ...DarkTheme,
    colors: {
      background: appColors.primaryFont,
      card: appColors.darkThemeSub,
      text: appColors.invoiceBtn,
      border: appColors.darkborder,
    },
  }

  const LightThemeValue = {
    ...DefaultTheme,
    colors: {
      background: appColors.graybackground,
      card: appColors.white,
      text: appColors.primaryFont,
      border: appColors.border,
    },
  }

  const theme = isDark ? DarkThemeValue : LightThemeValue

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {!isConnected ? (
          <RootStack.Screen name="NoInternet" component={NoInternet} />
        ) : (
          <>
            <RootStack.Screen name="Splash" component={Splash} />
            <RootStack.Screen name="OnBoarding" component={OnBoarding} />
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="LoginMail" component={LoginMail} />
            <RootStack.Screen name="Otp" component={Otp} />
            <RootStack.Screen name="CreateAccount" component={CreateAccount} />
            <RootStack.Screen name="DocumentVerify" component={DocumentVerify} />
            <RootStack.Screen name="VehicleRegistration" component={VehicleRegistration} />
            <RootStack.Screen name="BankDetail" component={BankDetail} />
            <RootStack.Screen name="TabNav" component={TabNav} />
            <RootStack.Screen name="Settings" component={Settings} />
            <RootStack.Screen name="AppSettings" component={AppSettings} />
            <RootStack.Screen name="MyWallet" component={MyWallet} />
            <RootStack.Screen name="TopupWallet" component={TopupWallet} />
            <RootStack.Screen name="Chat" component={Chat} />
            <RootStack.Screen name="AddNewOffer" component={AddNewOffer} />
            <RootStack.Screen name="ProfileSetting" component={ProfileSetting} />
            <RootStack.Screen name="MyRide" component={MyRide} />
            <RootStack.Screen name="AcceptFare" component={AcceptFare} />
            <RootStack.Screen name="ActiveRide" component={ActiveRide} />
            <RootStack.Screen name="EndRide" component={EndRide} />
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="OtpRide" component={OtpRide} />
            <RootStack.Screen name="Ride" component={Ride} />
            <RootStack.Screen name="RideComplete" component={RideComplete} />
            <RootStack.Screen name="RideDetails" component={RideDetails} />
            <RootStack.Screen name="PendingDetails" component={PendingDetails} />
            <RootStack.Screen name="CompleteDetails" component={CompleteDetails} />
            <RootStack.Screen name="RentalDetails" component={RentalDetails} />
            <RootStack.Screen name="DocumentDetail" component={DocumentDetail} />
            <RootStack.Screen name="BankDetails" component={BankDetails} />
            <RootStack.Screen name="VehicleDetail" component={VehicleDetail} />
            <RootStack.Screen name="Notification" component={Notification} />
            <RootStack.Screen name="Subscription" component={Subscription} />
            <RootStack.Screen name="Map" component={Map} />
            <RootStack.Screen name="MapDetails" component={MapDetails} />
            <RootStack.Screen name="AddVehicle" component={AddVehicle} />
            <RootStack.Screen name="VehicleList" component={VehicleList} />
            <RootStack.Screen name="OtpVerify" component={OtpVerify} />
            <RootStack.Screen name="SupportTicket" component={SupportTicket} />
            <RootStack.Screen name="CreateTicket" component={CreateTicket} />
            <RootStack.Screen name="TicketDetails" component={TicketDetails} />
            <RootStack.Screen name="PaymentSelect" component={PaymentSelect} />
            <RootStack.Screen name="PaymentWebView" component={PaymentWebView} />
            <RootStack.Screen name="RideInfo" component={RideInfo} />
            <RootStack.Screen name="NoService" component={NoService} />

          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

