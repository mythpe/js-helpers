// eslint-disable-next-line no-undef
declare type LocalStorageType = Storage | any

/**
 * Type of authentication class options
 */
export declare type AuthStorageOptions = {
  key?: string,
  roleKey?: string,
  storage?: any
}

/**
 * Auth keys
 */
export declare type AuthKeys = 'token' | 'user'

/**
 * Type of storage data
 */
export declare type AuthStorageData = {
  token?: string | null,
  user?: Object | null
}

export declare type AuthAttributes = AuthStorageData | null

export declare type RolesType = string | string[]

/**
 * Authentication Storage interface
 */
export interface AuthStorage {
  /**
   * Localstorage Object
   */
  localStorage: LocalStorageType
  /**
   * Localstorage Key
   */
  key: string,
  /**
   * Default localstorage state
   */
  default: AuthStorageData,
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
  data: (key?: AuthKeys) => any
  /**
   * Save localstorage state
   */
  save: (attributes?: AuthAttributes) => void
  /**
   * Set storage value
   * @param key
   * @param value
   */
  set: (key: AuthKeys, value: any) => void
  /**
   * Get data from storage
   */
  get: (key?: AuthKeys) => any
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
  is: (roles: RolesType) => boolean
}

class Auth implements AuthStorage {
  localStorage
  key
  roleKey
  default: AuthStorageData

  constructor (options?: AuthStorageOptions) {
    this.default = { token: null, user: null }
    this.roleKey = options?.key ? options.key : '@auth_key'
    this.roleKey = options?.roleKey ? options.roleKey : 'role_code'
    this.localStorage = options?.storage ? options.storage : (window !== undefined ? window.localStorage : null)
  }

  data (key?: AuthKeys): any {
    if (!this.localStorage) return null
    const defaultValue = this.default
    const o = JSON.parse(this.localStorage.getItem(this.key) || JSON.stringify(defaultValue)) || defaultValue
    if (!key) return o
    return o[key]
  }

  save (attributes?: AuthAttributes): void {
    if (!this.localStorage) return
    attributes = attributes || this.default
    const storageData = this.data()
    const save = { ...attributes }
    Object.keys(this.default).forEach(k => (save[k] = attributes[k] !== undefined ? attributes[k] : storageData[k]))
    this.localStorage.setItem(this.key, JSON.stringify(save))
  }

  set (key: AuthKeys, value: any) {
    const data = this.data()
    data[key] = value
    this.save(data)
  }

  get (key?: AuthKeys) {
    return this.data(key)
  }

  getAccessToken (): string | null {
    return this.data()?.token || null
  }

  getUserData (): Object | null {
    return this.data()?.user || null
  }

  isLogin (): boolean {
    const { token } = this.data()
    return token ? token.length > 0 : false
  }

  logout (): void {
    if (!this.localStorage) return
    this.localStorage.removeItem(this.key)
  }

  is (roles: RolesType): boolean {
    const { user } = this.data() || this.default
    if (!user || typeof user !== 'object') return false
    const t = user[this.roleKey]?.toLocaleLowerCase()?.trim() || null
    if (!t || typeof t !== 'string') return false
    let role = typeof roles === 'string' ? roles : roles
    role = typeof role === 'string' ? role.split(',') : Object.keys(role)
    role.map((i, item) => item?.toString()?.toLocaleLowerCase()?.trim())
    return role.indexOf(t) > -1
  }
}

const createAuthStorage = (options?: AuthStorageOptions): AuthStorage => new Auth(options)

export {
  createAuthStorage as default,
  createAuthStorage,
}
