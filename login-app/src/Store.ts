import create from 'zustand/vanilla'

interface IUserInfo {
  id: number
  email: string
  token: string
}

interface IStore {
  userInfo: IUserInfo
  setUserInfo: (info: IUserInfo) => void
}

export const store = create<IStore>((set) => ({
  userInfo: { id: 0, email: '', token: '' },
  setUserInfo: (info) => set(() => ({ userInfo: info })),
}))
