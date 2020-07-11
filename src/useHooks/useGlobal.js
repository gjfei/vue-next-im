import { getCurrentInstance } from 'vue'

export default function useGlobal() {

  const me = getCurrentInstance().ctx
  return me
}