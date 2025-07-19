// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name:'',
    log:false
  }),
  getters: {

  },
  actions: {
    register(name:string){
      this.name = name
      this.log = true
    },
    logIn(name:string){
      this.name = name
      this.log = true
    },
    logOut(){
      this.name = ''
      this.log = false
    }
  }
})
