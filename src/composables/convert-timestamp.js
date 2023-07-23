export const dateFormat = key => {
  const dateFormat = new Date(key * 1)
  return dateFormat.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
export const timeFormat = key => {
  const dateFormat = new Date(key * 1)
  return dateFormat.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}
export const dateFormatToUpdate = key => {
  const dateFormat = new Date(key * 1)
  return dateFormat.toLocaleString('en-ZA')
}
export const duration = (time1, time2) => {
  const date1 = new Date(time1 * 1)
  const date2 = new Date(time2 * 1)
  if (date1 > date2) {
    const timestamp = date1.getTime() - date2.getTime()
    let seconds = Math.floor(timestamp / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60
    hours = hours % 24

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
  }
  const timestamp = date2.getTime() - date1.getTime()
  let seconds = Math.floor(timestamp / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  seconds = seconds % 60
  minutes = minutes % 60
  hours = hours % 24
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
}
