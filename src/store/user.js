import { defineStore } from "pinia";
import { req } from "./request";
export const useUserStore = defineStore("User", {
  state: () => ({
    username: "",
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async reqLogin(data) {
      try {
        const response = await req("/auth/login", "post", data);
        this.token = response.data.token;
        if (response.headers.token) {
          localStorage.setItem("token", response.headers.token);
        }
        await this.reqUserInfo();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async reqUserInfo() {
      try {
        const response = await req(
          "https://api.lovelive.tools/api/SweetNothing",
          "get"
        );
        console.log(response);
        this.username = response;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout() {
      this.token = "";
      this.username = "";
      localStorage.removeItem("token");
    },
  },
  getters: {},
});
