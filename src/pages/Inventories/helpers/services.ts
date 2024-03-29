import { axiosRequest } from '../../../api/api'
import { IQueryParams, IPaginationProps, DataPropsForm } from '../../../types/GlobalTypes'
import { cloudinaryURL, inventoryURL } from '../../../utils/network'
import { IInventoryProps } from '../types/InventoryTypes'

export const getInventoriesNew = async (queryParams: IQueryParams) => {
  try {
    const finalURL = new URL(inventoryURL)
    const searchParams = new URLSearchParams()
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        searchParams.set(key, value.toString())
      })
    }
    finalURL.search = searchParams.toString()
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
        providerInfo: item.provider?.legal_name || 'N/A',
        photoInfo: item.photo,
      }))
      return { ...response.data, results: data }
    }
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}

export const postInventoriesNew = async (values: DataPropsForm) => {
  try {
    await axiosRequest({
      method: 'post',
      url: inventoryURL,
      hasAuth: true,
      payload: values,
    })
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}

export const putInventoriesEdit = async (data: { values: DataPropsForm; id: number }) => {
  try {
    await axiosRequest({
      method: 'put',
      url: `${inventoryURL}/${data.id}/`,
      hasAuth: true,
      payload: data.values,
    })
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}

export const deleteInventories = async (id: number) => {
  try {
    await axiosRequest({
      method: 'delete',
      url: `${inventoryURL}/${id}/`,
      hasAuth: true,
    })
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}

export const postImageToCloudinary = async (file: FormData) => {
  try {
    return await axiosRequest<{ url: string }>({
      method: 'post',
      url: cloudinaryURL,
      payload: file,
    })
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}
