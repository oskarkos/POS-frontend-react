import { IPaymentMethodsProps } from '../pages/Invoices/types/InvoicesTypes'

export interface IPurchaseAddRemoveProps {
  [key: number]: number
}

export interface DataPropsForm {
  [key: string]:
    | string
    | boolean
    | number
    | DataPropsForm
    | React.ReactElement
    | DataPropsForm[]
    | IPaymentMethodsProps[]
    | null
}

export interface IQueryParams {
  [key: string]: string | number | boolean
}

export interface IPaginationProps<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
