<template>
  <button :disabled="disabled" :class="classList" @click="$emit('click')">
    <div v-if="loading" class="button__loader">
      <AppLoader size="20" />
    </div>
    <AppIcon
      v-if="icon"
      :class="{ button__icon: true, 'button__icon--hide': loading }"
      :icon="icon"
      :color="iconColor"
    />
    <span
      v-if="title"
      :class="{ button__title: true, 'button__title--hide': loading }"
      >{{ title }}</span
    >
  </button>
</template>

<script>
import AppIcon from "./AppIcon.vue";
import AppLoader from "./AppLoader.vue";

export default {
  components: { AppLoader, AppIcon },
  props: {
    title: String,
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: Boolean,
    outline: Boolean,
    red: Boolean,
    clear: Boolean,
    icon: String,
    iconColor: {
      type: String,
    },
  },
  computed: {
    classList() {
      return {
        button: true,
        "button--primary": this.primary,
        "button--outline": this.outline,
        "button--red": this.red,
        "button--clear": this.clear,
        "button--disabled": this.disabled || this.loading,
        "button--padding-only-icon": this.icon && !this.title,
        "button--with-icon": this.icon,
      };
    },
  },
};
</script>

<style lang="scss">
.button {
  $self: &;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-style: solid;
  font-size: 0.75rem;
  border-width: 1px;
  border-color: transparent;
  height: 2rem;
  max-height: 100%;
  border-radius: 2px;
  cursor: pointer;
  white-space: nowrap;
  width: auto;
  padding-right: 1rem;
  padding-left: 1rem;

  &--padding-only-icon {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  &--with-icon {
    gap: 0.5rem;
  }

  &__title {
    position: relative;
    font-size: 1rem;
    transition: opacity 0.1s ease-in-out;
    &--hide {
      opacity: 0;
    }
  }

  &__icon {
    transition: opacity 0.1s ease-in-out;
    width: 12px;
    height: 12px;
    &--hide {
      opacity: 0;
    }
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--primary {
    color: white;
    background: #1890ff;

    &:hover {
      background-color: #1890ff;
    }

    &:active {
      &:not(#{ $self }--disabled) {
        background-color: #157ddf;
      }
    }
  }

  &--outline {
    border: 1px solid #eeeeee;

    &:hover {
      background-color: #ececec;
    }

    &:active {
      &:not(#{ $self }--disabled) {
        background-color: rgb(212, 212, 212);
      }
    }
  }

  &--red {
    color: white;
    background-color: #fb4d3d;

    &:hover {
      background-color: #da3f31;
    }
  }

  &--clear {
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }

    &:active {
      &:not(#{ $self }--disabled) {
        background-color: transparent;
      }
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
