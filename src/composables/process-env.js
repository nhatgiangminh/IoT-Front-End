
export function useProcessEnv() {
  return process.env.VUE_APP_AXIOS_ADMIN + '/v1/file/upload-image'
}
export function uploadFile() {
  return process.env.VUE_APP_AXIOS_ADMIN + '/v1/file/upload'
}
export function envUploadCkEditor() {
  return process.env.VUE_APP_AXIOS_ADMIN + '/v1/file/upload-ckEditor'
}
