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
      active: "Inbox",
      checked: false,
      selectAll: false,
      selected: [] as number[],
      activeEmail: null as number | null,
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
    clickOutside(event: MouseEvent) {
      if (
        event.target != null &&
        (event.target as HTMLElement).classList.contains("email-view")
      ) {
        this.activeEmail = null;
      }
    },
    keyEvents(event: KeyboardEvent) {
      if (event.key === "Escape") {
        this.activeEmail = null;
      }
      if (event.key === "r") {
        if (this.activeEmail != null)
          this.emailStore.readEmail(this.activeEmail);
        else this.emailStore.readEmails(this.selected);
      }

      if (event.key === "u") {
        if (this.activeEmail != null)
          this.emailStore.archiveEmail(this.activeEmail);
        else this.emailStore.unarchiveEmails(this.selected);
      }
    },
  },
  computed: {
    ...mapStores(useEmailStore),
  },
  mounted() {
    document.addEventListener("keydown", this.keyEvents);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.keyEvents);
  },
});
</script>

<template>
  <div class="main">
    <aside class="aside">
      <div class="aside--top">
        <TheButton @click="changeTab('Inbox')">
          Inbox ({{ emailStore.inbox.length }})</TheButton
        >
        <TheButton @click="changeTab('Archive')">
          Archived ({{ emailStore.archived.length }})
        </TheButton>
      </div>
      <div class="aside-bottom">
        <TheButton> Logout</TheButton>
      </div>
    </aside>
    <!-- inbox -->
    <section class="inbox" v-if="active === 'Inbox'">
      <header>
        <h5>{{ active }}</h5>
        <h1>Email Selected ({{ selected.length }})</h1>
      </header>
      <main>
        <div>
          <input type="checkbox" id="select-all" v-model="selectAll" />
          <TheButton @click="emailStore.readEmails(selected)"
            >Mark as Read (r)
          </TheButton>
          <TheButton
            @click="emailStore.archiveEmails(selected) && (selected = [])"
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
            <h2 @click="activeEmail = email.id" class="email--title">
              {{ email.title }}
            </h2>
          </div>
        </div>
      </main>
    </section>
    <!-- archive -->
    <section class="archive" v-else>
      <header>
        <h5>{{ active }}</h5>
        <h1>Email Selected ({{ selected.length }})</h1>
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
            <h2 @click="activeEmail = email.id" class="email--title">
              {{ email.title }}
            </h2>
          </div>
        </div>
      </main>
    </section>
    <!-- email view -->
    <div class="email-view" v-if="activeEmail != null" @click="clickOutside">
      <div class="email-view--details">
        <div class="email-view--head">
          <div>
            <TheButton
              appearance="text"
              @click="activeEmail = null"
              style="margin-bottom: 1rem"
              >Escape (ESC)
            </TheButton>
            <br />
            <TheButton
              @click="activeEmail && emailStore.readEmail(activeEmail)"
              style="margin-right: 1rem"
              >Mark as Read (r)
            </TheButton>
            <TheButton
              @click="activeEmail && emailStore.archiveEmail(activeEmail)"
              >Archive (a)</TheButton
            >
          </div>
        </div>

        <h2>
          {{
            emailStore.email.find((email) => email.id === activeEmail)?.title
          }}
        </h2>
        <p>
          {{ emailStore.email.find((email) => email.id === activeEmail)?.body }}
        </p>
      </div>
    </div>
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

    .button {
      &__filled {
        margin-left: 1rem;
      }
    }

    .email {
      display: flex;
      padding: 0 1rem;
      background-color: #e9ecef;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 5px;
      border: 1px solid #ced4da;

      &__read {
        opacity: 0.5;
      }

      &--checkbox {
        margin-right: 1rem;
      }
      &--title {
        margin: 0;
        font-size: 1.1rem;
        padding: 0.4rem 0;
        width: 100%;
      }
    }
  }

  .email-view {
    position: absolute;
    width: 100vw;
    height: 100vh;
    right: 0%;
    background: rgba(0, 0, 0, 0.5);

    &__head {
      .button__filled {
        margin-right: 0.5rem;
      }
    }

    &--details {
      background: white;
      padding: 1rem;
      border-radius: 5px;
      width: 60vw;
      height: 100%;
      position: absolute;
      right: 0%;
      overflow: auto;
    }
  }
}
</style>
