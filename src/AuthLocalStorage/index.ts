export declare type DefaultAuth = {
  token: string | null,
  user: Object | null
}

export interface AuthStorage {
  /**
   * Localstorage Key
   */
  key: string,

  /**
   * Default localstorage state
   */
  default: DefaultAuth,

  /**
   * Must set this value from back-end user
   * User role key value
   * Example: user = { [role_code]: '3' }
   * Example: user = { [role_code]: 'admin' }
   */
  roleKey: string

  /**
   * Get localstorage state
   * @param key
   */
  data: (key?) => any

  /**
   * Save localstorage state
   */
  save: (attributes: Object) => void

  /**
   * Set storage value
   * @param key
   * @param value
   */
  set: (key: string, value: any) => void

  /**
   * Get data from storage
   */
  get: (key?: string) => any

  /**
   * Get access token from localstorage
   */
  getAccessToken: () => string | null

  /**
   * Get user data from localstorage
   */
  getUserData: () => Object | null

  /**
   * Check if localstorage have token
   */
  isLogin: () => boolean

  /**
   * Remove localstorage
   */
  logout: () => void

  /**
   * Check user role
   * @param roles
   */
  is: (roles: string | Array<string>) => boolean
}

const AuthStorageObject = window.localStorage

export default class Auth implements AuthStorage {
  key = '@auth_key'
  roleKey = 'role_code'
  default = { token: null, user: null }

  data (key = null) {
    const defaultValue = this.default
    const o = JSON.parse(AuthStorageObject.getItem(this.key) || JSON.stringify(defaultValue)) || defaultValue
    if (key === null) return o
    return o[key]
  }

  save (attributes = {}) {
    const storageData = this.data()
    const save = { ...attributes }
    Object.keys(this.default).forEach(k => (save[k] = attributes[k] !== undefined ? attributes[k] : storageData[k]))
    AuthStorageObject.setItem(this.key, JSON.stringify(save))
  }

  getAccessToken () {
    return this.data()?.token || null
  }

  getUserData () {
    return this.data()?.user || null
  }

  isLogin () {
    const { token } = this.data()
    return token ? token.length > 0 : false
  }

  logout () {
    AuthStorageObject.removeItem(this.key)
  }

  is (roles) {
    const { user } = this.data() || this.default
    if (!user || typeof user !== 'object') return false
    const t = user[this.roleKey]?.toLocaleLowerCase()?.trim() || null
    if (!t || typeof t !== 'string') return false
    let role = typeof roles === 'string' ? roles : roles
    role = typeof role === 'string' ? role.split(',') : Object.keys(role)
    role.map((i, item) => item?.toString()?.toLocaleLowerCase()?.trim())
    return role.indexOf(t) > -1
  }

  set (key, value) {
    const data = this.data()
    data[key] = value
    this.save(data)
  }

  get (key) {
    return this.data(key)
  }
}
