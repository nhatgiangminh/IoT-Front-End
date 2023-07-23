export const previewImage = (img, callback) => {
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => callback(fileReader.result))
  fileReader.readAsDataURL(img)
}
