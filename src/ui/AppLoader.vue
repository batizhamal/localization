<template>
  <div
    :class="classList"
    :style="!fullscreen && !overlay && style"
  >
    <svg
      viewBox="25 25 50 50"
      class="loader__icon"
      :style="(fullscreen && style) || (overlay && style)"
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        class="loader__circular"
      />
    </svg>
    <div
      v-if="label || title"
      class="loader__label"
    >
      {{ label || title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoader",
  props: {
    size: {
      type: [Number, String],
      default: 50,
    },
    fullscreen: Boolean,
    overlay: Boolean,
    label: String,
    title: String,
    color: {
      type: String,
      default: "inherit",
      validator: (color) =>
        [
          "red",
          "green",
          "yellow",
          "primary",
          "gray",
          "dark",
          "black",
          "white",
          "inherit",
        ].includes(color),
    },
  },
  computed: {
    style() {
      return this.size
        ? `width:${Number.parseInt(this.size) / 16}rem;height:${
            Number.parseInt(this.size) / 16
          }rem;`
        : false;
    },
    classList() {
      return {
        loader: true,
        "loader--fullscreen": this.fullscreen,
        "loader--overlay": this.overlay,
        ["loader--color-" + this.color]: this.color,
      };
    },
  },
};
</script>

<style lang="scss">
.loader {
  $self: &;
  width: 3rem;
  height: 3rem;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: show 0.5s ease-in-out;

  &__label {
    margin-top: 0.75rem;
  }

  &--fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba($color: white, $alpha: 0.8);
  }

  &--overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba($color: white, $alpha: 0.8);
  }

  &__icon {
    animation: loading-rotate 2s linear infinite;
  }

  &__circular {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 4;
    stroke: currentColor;
    stroke-linecap: round;
  }

  &--color {
    $colors: (
      "red": red,
      "black": black,
      "white": whie,
    );

    @each $colorName, $color in $colors {
      &-#{$colorName} {
        color: #{$color};
      }
    }
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
}

@keyframes loading-rotate {
  to {
    transform: rotate(1turn);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -2rem;
  }
  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -6rem;
  }
}
</style>
