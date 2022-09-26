import { defineStore } from "pinia";
import type { Email } from "@/types";

export const useEmailStore = defineStore("email", {
  state: () => ({
    email: [] as Email[],
  }),
  getters: {
    inbox: (state) => state.email.filter((email) => !email.archived),
    archived: (state) => state.email.filter((email) => email.archived),
  },
  actions: {
    archiveEmail(id: number) {
      const email = this.email.find((email) => email.id === id);
      if (email) {
        email.archived = true;
      }
    },
    readEmail(id: number) {
      const email = this.email.find((email) => email.id === id);
      if (email) {
        email.read = true;
      }
    },
    readEmails(ids: number[]) {
      ids.forEach((id) => this.readEmail(id));
    },
  },
});
