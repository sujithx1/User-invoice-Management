export const getFinancialYear = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return month < 4 ? `${year - 1}-${year}` : `${year}-${year + 1}`
}
