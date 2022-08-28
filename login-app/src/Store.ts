import create from 'zustand/vanilla'
import createHook from 'zustand'

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
  setUserInfo: (info) => set(() => ({ userInfo: info })),
  resetUser: () => set(() => ({ userInfo: initialUserState })),
}))

export const useStore = createHook(store)
