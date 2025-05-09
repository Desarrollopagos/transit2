export interface DropdownProps {
  open: boolean
  value: string | null
  items: { label: string; value: string }[]
  onChange: (value: string) => void
  setOpen: (open: boolean) => void
  containerStyle?: Record<string, any>
  zIndex?: number
  placeholderValue?: string
}
