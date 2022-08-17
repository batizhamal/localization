<template>
  <div class="icon">
    <component
      :is="icon"
      :color="color"
    />
  </div>
</template>

<script>
export default {
  components: {
    Trash: () => import("@/assets/icons/Trash"),
    Upload: () => import("@/assets/icons/Upload"),
    Download: () => import("@/assets/icons/Download"),
    Edit: () => import("@/assets/icons/Edit"),
  },
  props: {
    icon: String,
    color: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1rem;
  height: 1rem;
  display: inline;
}
</style>
