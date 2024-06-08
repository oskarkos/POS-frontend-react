const baseURL = import.meta.env.VITE_BASE_URL

export const loginURL = baseURL + 'user/login'
export const meURL = baseURL + 'user/me'
export const createUserURL = baseURL + 'user/create-user'
export const usersURL = baseURL + 'user/users'
export const updatePasswordURL = baseURL + 'user/update-password'
export const groupURL = baseURL + 'app/group'
export const inventoryURL = baseURL + 'app/inventory'
export const inventoryCSVURL = baseURL + 'app/inventory-csv'
export const shopURL = baseURL + 'app/shop'
export const activitiesURL = baseURL + 'user/activities'
export const invoiceMinimalURL = baseURL + 'app/invoice-simple-list'
export const invoiceURL = baseURL + 'app/invoice'
export const invoiceByCodeURL = baseURL + 'app/invoice-painter'
export const invoiceUpdatePaymentMethodsURL = baseURL + 'app/update-payment-methods'
export const summaryURL = baseURL + 'app/summary'
export const topSellURL = baseURL + 'app/top-selling'
export const paymentTerminalsURL = baseURL + 'app/payment-terminal'
export const providersURL = baseURL + 'app/provider'
export const customerURL = baseURL + 'app/customer'
export const purchaseSummaryURL = baseURL + 'app/purchase-summary'
export const dianResolutionURL = baseURL + 'app/dian-resolution'
export const overrideInvoiceURL = baseURL + 'app/update-invoice'
export const summaryByHour = baseURL + 'app/hourly-quantities'
export const summaryByKeyframe = baseURL + 'app/sales-by-timeframe'
export const salesByUser = baseURL + 'app/sales-by-user'
export const downloadReportURL = baseURL + 'app/'

export const cloudinaryURL = 'https://api.cloudinary.com/v1_1/de4vbdzth/upload'
