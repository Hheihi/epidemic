// 文件转换

export const FILE_TO_BASE64 = img => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.readAsDataURL(img)
  })
}

export const BASE64_TO_FILE = (base64, filename) => {
  return new Promise(resolve => {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    resolve(new File([u8arr], filename, { type: mime }))
  })
}
