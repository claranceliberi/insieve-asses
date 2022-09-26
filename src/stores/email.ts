import { defineStore } from "pinia";
import type { Email } from "@/types";

export const useEmailStore = defineStore("email", {
  state: () => ({
    email: [
      {
        id: 0,
        title: "Email 0",
        body: "This is email 0",
        read: false,
        archived: false,
      },
      {
        id: 1,
        title: "Email 1",
        body: "This is email 1",
        read: true,
        archived: false,
      },
      {
        id: 2,
        title: "Email 2",
        body: "This is email 2",
        read: false,
        archived: false,
      },
      {
        id: 3,
        title: "Email 3",
        body: "This is email 3",
        read: false,
        archived: false,
      },
      {
        id: 4,
        title: "Email 4",
        body: "This is email 4",
        read: false,
        archived: true,
      },
    ] as Email[],
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
    archiveEmails(ids: number[]) {
      ids.forEach((id) => this.archiveEmail(id));
    },
    unarchiveEmail(id: number) {
      const email = this.email.find((email) => email.id === id);
      if (email) {
        email.archived = false;
      }
    },
    unarchiveEmails(ids: number[]) {
      ids.forEach((id) => this.unarchiveEmail(id));
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
