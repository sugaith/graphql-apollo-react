import create from 'zustand/vanilla'
import createHook from 'zustand'
import Cookies from 'universal-cookie'

export interface IUserInfo {
  id: number
  email: string
  token: string
}

export interface IStore {
  userInfo: IUserInfo
  setUserInfo: (info: IUserInfo) => void
  resetUser: () => void
}

const initialUserState = { id: 0, email: '', token: '' }

export const store = create<IStore>((set) => ({
  userInfo: initialUserState,

  setUserInfo: (info) => {
    const cookies = new Cookies()
    cookies.set(
      'userAuth',
      {
        token: info.token,
        id: info.id,
      },
      { sameSite: 'strict', path: '/' },
    )
    return set(() => ({ userInfo: info }))
  },

  resetUser: () => {
    const cookies = new Cookies()
    cookies.remove('userAuth')
    return set(() => ({ userInfo: initialUserState }))
  },
}))

export const useStore = createHook(store)
