import { defineStore } from "pinia";
import { req } from "./request";
export const useUserStore = defineStore("User", {
  state: () => ({
    username: "",
    id: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async reqLogin(data) {
      try {
        const response = await req("/auth/login", "post", data);
        console.log(response);
        if (response.token && response.user) {
          this.token = response.token;
          this.id = response.user.id;
          this.username = response.user.username;
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", response.user.id);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async reqUserInfo() {
      try {
        const response = await req(`/auth/users/${this.id}`, "get");
        console.log(response);
        this.username = response.username;
        this.id = response._id;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async reqRegister(data) {
      await req("/auth/register", "post", data);
      
    },
    logOut() {
      this.token = "";
      this.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
  getters: {},
});
