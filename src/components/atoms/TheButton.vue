<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

type buttonType = "filled" | "text";

export default defineComponent({
  name: "TheButton",
  props: {
    appearance: {
      type: Object as PropType<buttonType>,
      default: () => "filled" as buttonType,
    },
  },
});
</script>
<template>
  <button
    :class="{
      button__filled: appearance == 'filled',
      button__text: appearance == 'text',
    }"
  >
    <slot></slot>
  </button>
</template>
<style scoped lang="scss">
button {
  cursor: pointer;
}
.button {
  &__filled {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: #f4f8f9;
  }
  &__text {
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    text-decoration: underline;
  }
}
</style>
