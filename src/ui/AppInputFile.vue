<template>
  <div>
    <input
      type="file"
      ref="mfile"
      class="file"
      @change="$emit('change', $refs.mfile.files[0])"
    />
    <AppButton
      icon="https://super.so/icon/light/upload.svg"
      :title="title"
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
  },
};
</script>

<style>
.file {
  display: none;
}
</style>
