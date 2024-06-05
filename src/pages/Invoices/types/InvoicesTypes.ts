import { IDianResolutionProps } from '../../Dian/types/DianResolutionTypes'
import { ICustomerProps } from '../../POS/components/types/CustomerTypes'
import { IPaymentMethodToSend } from '../../POS/components/types/PaymentMethodsTypes'

export interface IInvoiceProps {
  id: number
  created_at: string
  created_by: {
    email: string
    fullname: string
  }
  invoice_items: IItemInvoice[]
  sale_by: {
    fullname: string
  }
  customer: ICustomerProps
  payment_methods: IPaymentMethodToSend[]
  payment_terminal: {
    id: number
    name: string
    account_code: string
  } | null
  is_dollar: boolean
  invoice_number: number
  dian_resolution: IDianResolutionProps
  is_override: boolean
  key?: number
}

export interface IInvoiceMinimalProps {
  invoice_number: string
  is_dollar: boolean
  is_override: boolean
  created_at: string
  payment_terminal: {
    name: string
    account_code: string
  } | null
  payment_methods: { name: string }[]
  sale_by: { fullname: string }
  total_sum: number
  total_sum_usd: number
}

export interface IItemInvoice {
  id: number
  amount: number
  discount: number
  item: {
    selling_price: number
    usd_price: number
  }
  item_code: string
  item_name: string
  original_amount: number
  original_usd_amount: number
  quantity: number
  usd_amount: number
  is_gift: boolean
}
