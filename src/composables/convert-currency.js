export const convertCurrency = (input) => {
  return Intl.NumberFormat('de-DE').format(input * 1)
}
