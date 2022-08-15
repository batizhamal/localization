<template>
  <div>
    <input
      type="file"
      ref="mfile"
      class="file"
      @change="$emit('change', $refs.mfile.files[0])"
    />
    <AppButton
      icon="upload"
      :icon_color="icon_color"
      :title="title"
      :disabled="disabled"
      :clear="clear"
      @click="$refs.mfile.click()"
      primary
    />
  </div>
</template>

<script>
import AppButton from "./AppButton.vue";
export default {
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      default: "Upload",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clear: Boolean,
    icon_color: String,
  },
};
</script>

<style>
.file {
  display: none;
}
</style>
