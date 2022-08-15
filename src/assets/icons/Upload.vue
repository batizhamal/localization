<template>
  <svg
    width="12"
    height="13"
    viewBox="0 0 12 13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 13C1.08333 13 0.729334 12.854 0.438 12.562C0.146 12.2707 0 11.9167 0 11.5V10H1.5V11.5H10.5V10H12V11.5C12 11.9167 11.854 12.2707 11.562 12.562C11.2707 12.854 10.9167 13 10.5 13H1.5ZM5.25 10V2.875L3.062 5.062L2 4L6 0L10 4L8.938 5.062L6.75 2.875V10H5.25Z"
      :class="color"
    />
  </svg>
</template>

<script>
import Style from "./Style.vue";

export default {
  extends: Style,
};
</script>
