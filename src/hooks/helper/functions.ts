import { axiosRequest } from '../../api/api'
import { formatDateTime } from '../../layouts/helpers/helpers'
import { IGroupsProps } from '../../pages/Groups/types/GroupTypes'
import { IInventoryProps } from '../../pages/Inventories/types/InventoryTypes'
import { IInvoiceProps } from '../../pages/Invoices/types/InvoicesTypes'
import { IUserProps, UserRolesEnum } from '../../pages/Users/types/UserTypes'
import { IPaginationProps, IQueryParams } from '../../types/GlobalTypes'
import { groupURL, inventoryURL, invoiceURL, shopURL, usersURL } from '../../utils/network'
import { IShopProps } from './../../pages/Shops/types/ShopTypes'

export const getGroups = async (
  setGroup: (data: IPaginationProps<IGroupsProps>) => void,
  setFetching: (val: boolean) => void,
  page?: number,
) => {
  try {
    setFetching(true)
    const finalURL = new URL(groupURL)
    if (page) finalURL.searchParams.append('page', String(page))
    const response = await axiosRequest<IPaginationProps<IGroupsProps>>({
      url: finalURL,
      hasAuth: true,
      showError: false,
    })
    if (response) {
      const data = response.data.results.map((item) => ({
        ...item,
        key: item.id,
        created_at: formatDateTime(item.created_at),
        belongsTo: item.belongs_to ? item.belongs_to.name : 'No aplica',
      }))
      setGroup({ ...response.data, results: data })
    }
  } catch (e) {
    console.log(e)
  } finally {
    setFetching(false)
  }
}

export const getInventories = async (
  setInventories: (data: IPaginationProps<IInventoryProps>) => void,
  setFetching: (val: boolean) => void,
  page = 1,
) => {
  try {
    setFetching(true)
    const finalURL = new URL(inventoryURL)
    finalURL.searchParams.append('page', String(page))
    const response = await axiosRequest<IPaginationProps<IInventoryProps>>({
      url: finalURL,
      hasAuth: true,
      showError: false,
    })
    if (response) {
      const data = response.data.results.map((item) => ({
        ...item,
        key: item.id,
        groupInfo: `${item.group?.belongs_to?.name ? `${item.group?.belongs_to?.name} /` : ''} ${
          item.group?.name
        }`,
        photoInfo: item.photo,
      }))
      setInventories({ ...response.data, results: data })
    }
  } catch (e) {
    console.log(e)
  } finally {
    setFetching(false)
  }
}

export const getShops = async (
  setShops: (data: IPaginationProps<IShopProps>) => void,
  setFetching: (val: boolean) => void,
  page?: number,
) => {
  try {
    setFetching(true)
    const finalURL = new URL(shopURL)
    if (page) finalURL.searchParams.append('page', String(page))
    const response = await axiosRequest<IPaginationProps<IShopProps>>({
      url: finalURL,
      hasAuth: true,
      showError: false,
    })
    if (response) {
      const data = response.data.results.map((item) => ({
        ...item,
        key: item.id,
        created_at: formatDateTime(item.created_at),
        created_by_email: String(item.created_by.email),
      }))
      setShops({ ...response.data, results: data })
    }
  } catch (e) {
    console.log(e)
  } finally {
    setFetching(false)
  }
}

export const getUsers = async (
  setUsers: (data: IPaginationProps<IUserProps>) => void,
  setFetching: (val: boolean) => void,
  queryParams?: IQueryParams,
) => {
  try {
    setFetching(true)
    const finalURL = new URL(usersURL)
    const searchParams = new URLSearchParams()
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        searchParams.set(key, value.toString())
      })
    }
    finalURL.search = searchParams.toString()
    const response = await axiosRequest<IPaginationProps<IUserProps>>({
      url: finalURL,
      hasAuth: true,
      showError: false,
    })
    if (response) {
      const data = response.data.results.map((item) => ({
        ...item,
        key: item.id,
        created_at: formatDateTime(item.created_at),
        last_login: item.last_login ? formatDateTime(item.last_login) : 'N/A',
        is_active: item.is_active.toString(),
        role: UserRolesEnum[item.role as keyof typeof UserRolesEnum] || 'Rol desconocido',
      }))
      setUsers({ ...response.data, results: data })
    }
  } catch (e) {
    console.log(e)
  } finally {
    setFetching(false)
  }
}
export const getInvoices = async (
  setInvoices: (data: IPaginationProps<IInvoiceProps>) => void,
  setFetching: (val: boolean) => void,
  page = 1,
) => {
  try {
    setFetching(true)
    const finalURL = new URL(invoiceURL)
    finalURL.searchParams.append('page', String(page))
    const response = await axiosRequest<IPaginationProps<IInvoiceProps>>({
      url: finalURL,
      hasAuth: true,
      showError: false,
    })
    if (response) {
      const dataFormatted: IInvoiceProps[] = response.data.results.map((item: any) => ({
        ...item,
        key: item.id,
        created_by_name: item.created_by.fullname,
        shop_name: item.shop.name,
        sale_name: item.sale_by ? item.sale_by.fullname : 'SIGNOS',
        customer_id: item.customer_id,
        customer_name: item.customer_name,
        customer_email: item.customer_email,
        customer_phone: item.customer_phone,
        invoice_items: item.invoice_items.map((itemInvoice: any) => ({
          code: itemInvoice.item_code,
          id: itemInvoice.id,
          price: itemInvoice.item.price,
          qty: itemInvoice.quantity,
          item: itemInvoice.item_name,
          total: itemInvoice.amount,
        })),
        payment_methods: item.payment_methods,
        is_dollar: item.is_dollar,
      }))
      setInvoices({ ...response.data, results: dataFormatted })
    }
  } catch (e) {
    console.log(e)
  } finally {
    setFetching(false)
  }
}
