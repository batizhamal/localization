<template>
  <div class="panel">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.panel {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  height: $panel_height;
  max-height: 100%;
  padding: 0 $padding;
}
</style>
