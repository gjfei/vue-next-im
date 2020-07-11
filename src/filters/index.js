/**
 * 图片拼接地址(全局过滤器)
 * @param {String} url
 */
export function contactImgUrl(url) {
  return process.env.VUE_APP_BASE_IMG_URL + url
}