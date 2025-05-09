import { DOCUMENT } from '../types/index'
import { documentServices } from '../../services/index'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const documentGet = createAsyncThunk(DOCUMENT, async () => {
  const response = await documentServices.documentType()
  return response?.data
})
