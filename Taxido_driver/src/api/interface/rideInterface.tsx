export interface RideInterface {
  success?: boolean
  rideGet?: RideDataInterface
  rideGets?: RideDataInterface
  ridePost?: RidePostInterface
  rideUpdate?: RideUpdateInterface
  loading?: boolean
}

export interface RidePostInterface {
  success?: boolean
  ridePost?: RideDataInterface
  loading?: boolean
}

export interface RideDataInterface {
  ride_id: number
  otp: string
  start_time: number
}

export interface RideUpdateInterface {}
