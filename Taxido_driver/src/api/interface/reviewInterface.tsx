export interface ReviewInterface {
  success?: boolean
  userReviewData?: ReviewDataInterface
  rentalVehicleDetailData?: ReviewDataInterface
  rentalVehicleList?: RentalVehicleListInterface
  rentalUpdate?: RentalVehicleListInterface
  loading?: boolean
}

export interface ReviewDataInterface {
  ride_id: number
  rating: number
  description: string
}

export interface RentalVehicleListInterface { }
