import React, { useState, createContext, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  textRtlStyle,
  imageRtlStyle,
  viewRtlStyle,
  viewSelfRtlStyle,
} from '../../style/rtlStyles'
import { ContextType } from './types'

const initialContextVal = {
  currSymbol: '$',
  currValue: 1,
  isDark: false,
  setIsDark: () => { },
  rtl: false,
  setRtl: () => { },
  setCurrValue: () => { },
  setCurrSymbol: () => { },
  textRtlStyle: 'left',
  imageRtlStyle: [{ scaleX: -1 }],
  viewRtlStyle: 'row',
  viewSelfRtlStyle: 'flex-end',
  token: '',
  setToken: '',
  accountDetail: '',
  setAccountDetail: () => { },
  documentDetail: '',
  setDocumentDetail: () => { },
  vehicleDetail: '',
  setVehicleDetail: () => { },
}

export const AppContext = createContext<ContextType>(initialContextVal)

export const AppContextProvider = (props: any) => {
  const [currSymbol, setCurrSymbolState] = useState('$')
  const [currValue, setCurrValueState] = useState(1)
  const [isDark, setIsDark] = useState(false)
  const [rtl, setRtl] = useState(false)
  const [token, setToken] = useState('')
  const [accountDetail, setAccountDetail] = useState('')
  const [documentDetail, setDocumentDetail] = useState('')
  const [vehicleDetail, setVehicleDetail] = useState('')
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [categoryIndex, setCategoryIndex] = useState<number>(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const rtlValue = await AsyncStorage.getItem('rtl')
        if (rtlValue !== null) {
          setToken(JSON.parse(rtlValue))
        }
      } catch (error) {
        console.error('Error retrieving rtl value:', error)
      }
    }
    fetchToken()
  }, [])

  useEffect(() => {
    const fetchDarkTheme = async () => {
      try {
        const darkThemeValue = await AsyncStorage.getItem('darkTheme')
        if (darkThemeValue !== null) {
          setIsDark(JSON.parse(darkThemeValue))
        }
      } catch (error) {
        console.error('Error retrieving dark theme value:', error)
      }
    }
    fetchDarkTheme()
  }, [])

  useEffect(() => {
    const loadCurrencyFromStorage = async () => {
      try {
        const savedCurrSymbol = await AsyncStorage.getItem('currSymbol')
        const savedCurrValue = await AsyncStorage.getItem('currValue')
        if (savedCurrSymbol && savedCurrValue) {
          setCurrSymbolState(savedCurrSymbol)
          setCurrValueState(parseFloat(savedCurrValue))
        }
      } catch (error) {
        console.error('Error loading currency from storage:', error)
      }
    }
    loadCurrencyFromStorage()

    const loadLanguageFromStorage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage')
        if (savedLanguage) {
        }
      } catch (error) {
        console.error('Error loading language from storage:', error)
      }
    }
    loadLanguageFromStorage()
  }, [])

  const setCurrSymbol = async (symbol: string) => {
    try {
      await AsyncStorage.setItem('currSymbol', symbol)
      setCurrSymbolState(symbol)
    } catch (error) {
      console.error('Error setting currSymbol:', error)
    }
  }

  const setCurrValue = async (value: number) => {
    try {
      await AsyncStorage.setItem('currValue', value.toString())
      setCurrValueState(value)
    } catch (error) {
      console.error('Error setting currValue:', error)
    }
  }


  const contextValue = {
    currSymbol,
    setCurrSymbol,
    currValue,
    setCurrValue,
    isDark,
    setIsDark,
    rtl,
    setRtl,
    textRtlStyle: textRtlStyle(rtl),
    imageRtlStyle: imageRtlStyle(rtl),
    viewRtlStyle: viewRtlStyle(rtl),
    viewSelfRtlStyle: viewSelfRtlStyle(rtl),
    token,
    setToken,
    accountDetail,
    setAccountDetail,
    documentDetail,
    setDocumentDetail,
    vehicleDetail,
    setVehicleDetail,
    selectedItemIndex,
    setSelectedItemIndex,
    categoryIndex, setCategoryIndex

  }

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useValues = () => useContext(AppContext)
