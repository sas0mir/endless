import { defineStore } from 'pinia';
import type IUser from '~/types/User';

const defaultValue: { user: IUser } = {
  user: {
    id: 0,
    name: '',
    email: '',
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => defaultValue,
  getters: {
    isAuth: state => state.user.id
  },
  actions: {
    clear() {
      this.$patch(defaultValue)
    },
    set(input: IUser) {
      this.$patch({user: input})
    }
  }
})
