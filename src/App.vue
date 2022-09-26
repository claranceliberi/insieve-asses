<script lang="ts">
import { defineComponent } from "vue";
import TheButton from "./components/atoms/TheButton.vue";
import { mapStores } from "pinia";
import { useEmailStore } from "./stores/email";

export default defineComponent({
  components: {
    TheButton,
  },

  data() {
    return {
      active: "",
      checked: false,
      selectAll: false,
      selected: [] as number[],
    };
  },
  watch: {
    selectAll(val) {
      if (val) this.selected = this.emailStore.inbox.map((email) => email.id);
      else this.selected = [];
    },
  },
  methods: {
    changeTab(tab: string) {
      if (this.active === tab) return;
      this.active = tab;
      this.selected = [];
    },
  },
  computed: {
    ...mapStores(useEmailStore),
  },
});
</script>

<template>
  <div class="main">
    <aside class="aside">
      <div class="aside--top">
        <TheButton @click="changeTab('inbox')"> Inbox</TheButton>
        <TheButton @click="changeTab('archive')"> Archived</TheButton>
      </div>
      <div class="aside-bottom">
        <TheButton> Logout</TheButton>
      </div>
    </aside>
    <section class="inbox" v-if="active === 'inbox'">
      <header>
        <h5>{{ active }}</h5>
        <h1>Email Selected ({{ emailStore.inbox.length }})</h1>
      </header>
      <main>
        <div>
          <input type="checkbox" id="select-all" v-model="selectAll" />
          <TheButton @click="emailStore.readEmails(selected)"
            >Mark as Read (r)
          </TheButton>
          <TheButton @click="emailStore.archiveEmails(selected)"
            >Archive (a)</TheButton
          >
        </div>
        <div>
          <div
            class="email"
            :class="{ email__read: email.read }"
            v-for="email in emailStore.inbox"
            :key="email.id"
          >
            <input
              class="email--checkbox"
              type="checkbox"
              :id="'email' + email.id"
              v-model="selected"
              :value="email.id"
            />
            <h2 class="email--title">{{ email.title }}</h2>
          </div>
        </div>
      </main>
    </section>
    <section class="archive" v-else>
      <header>
        <h5>{{ active }}</h5>
        <h1>Email Selected ({{ emailStore.archived.length }})</h1>
      </header>
      <main>
        <div>
          <input type="checkbox" id="select-all" v-model="selectAll" />
          <TheButton @click="emailStore.unarchiveEmails(selected)"
            >Unarchive (u)</TheButton
          >
        </div>
        <div>
          <div
            class="email"
            :class="{ email__read: email.read }"
            v-for="email in emailStore.archived"
            :key="email.id"
          >
            <input
              class="email--checkbox"
              type="checkbox"
              :id="'email' + email.id"
              v-model="selected"
              :value="email.id"
            />
            <h2 class="email--title">{{ email.title }}</h2>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  padding: 0.5rem 1rem;
  background: black;
  height: 100vh;
  .aside {
    width: 20%;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &--top {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    &--bottom {
      margin-top: auto;
    }
  }
  .inbox,
  .archive {
    background: white;
    flex-grow: 1;
    display: flex;
    padding-left: 1rem;
    flex-direction: column;
    .email {
      display: flex;
      padding: 0.4rem 1rem;
      background-color: #cccccc;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 5px;
      border: 1px solid #f4f0f9;

      &__read {
        opacity: 0.3;
      }

      &--checkbox {
        margin-right: 1rem;
      }
      &--title {
        margin: 0;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
