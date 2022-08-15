<template>
  <div class="icon">
    <component :is="icon" :color="color"></component>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    color: {
      type: String,
    },
  },
  components: {
    Trash: () => import("@/assets/icons/Trash"),
    Upload: () => import("@/assets/icons/Upload"),
    Download: () => import("@/assets/icons/Download"),
    Edit: () => import("@/assets/icons/Edit"),
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
