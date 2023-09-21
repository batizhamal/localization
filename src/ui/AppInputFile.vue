<template>
  <div>
    <input
      ref="mfile"
      type="file"
      class="file"
      @change="$emit('change', $refs.mfile.files[0])"
    />
    <AppButton
      icon="upload"
      :icon-color="iconColor"
      :title="title"
      :disabled="disabled"
      :clear="clear"
      :loading="loading"
      primary
      @click="$refs.mfile.click()"
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
    loading: {
      type: Boolean,
      default: false,
    },
    clear: Boolean,
    iconColor: String,
  },
};
</script>

<style>
.file {
  display: none;
}
</style>
