<template>
  <div style="display: inline">
    <component
      :is="icon"
      :color="color"
      :width="width"
      :height="height"
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
    Alert: () => import("@/assets/icons/Alert"),
  },
  props: {
    icon: String,
    color: {
      type: String,
    },
    width: {
      type: String,
      default: "16",
    },
    height: {
      type: String,
      default: "16",
    },
  },
};
</script>
