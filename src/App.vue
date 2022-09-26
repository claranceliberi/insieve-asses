<script lang="ts">
import { defineComponent } from "vue";
import TheButton from "./components/atoms/TheButton.vue";
import CheckBox from "./components/atoms/CheckBox.vue";

export default defineComponent({
  components: {
    TheButton,
    CheckBox,
  },

  data() {
    return {
      checked: false,
    };
  },
});
</script>

<template>
  <header>
    <div class="wrapper">localhost</div>
  </header>

  <main>
    <TheButton> button</TheButton>
    <TheButton appearance="text"> button</TheButton>
    <CheckBox id="checkbox" v-model="checked" />
    {{ checked }}
  </main>
</template>

<style scoped lang="scss"></style>
