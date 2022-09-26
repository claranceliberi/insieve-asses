<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckBox",
  emits: ["update:modelValue"],
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>
<template>
  <div class="checkbox">
    <input
      :id="id"
      type="checkbox"
      :checked="value"
      @change="value = $event.target == null ? false : $event.target.checked"
    />
    <label :for="id">
      <slot></slot>
    </label>
  </div>
</template>
<style scoped lang="scss"></style>
