<template>
  <button @click="$emit('click')" :disabled="disabled" :class="classList">
    <img
      v-if="icon"
      :class="{ button__icon: true, 'button__icon--hide': loading }"
      :src="icon"
    />
    <span
      v-if="title"
      :class="{ button__title: true, 'button__title--hide': loading }"
      >{{ title }}</span
    >
    <div class="button__loader" v-if="loading">
      <AppLoader size="20" />
    </div>
  </button>
</template>

<script>
import AppLoader from "./AppLoader.vue";
export default {
  components: { AppLoader },
  props: {
    title: String,
    icon: String,
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
  },
  computed: {
    classList() {
      return {
        button: true,
        "button--padding": !this.icon,
        "button--padding-with-icon": this.icon,
        "button--primary": this.primary,
        "button--outline": this.outline,
        "button--red": this.red,
        "button--disabled": this.disabled || this.loading,
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
  font-size: rem(14);
  border-width: 1px;
  border-color: transparent;
  height: 2rem;
  max-height: 100%;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  width: auto;

  &--padding {
    padding-right: rem(14);
    padding-left: rem(14);
  }

  &--padding-with-icon {
    padding-right: rem(14);
    padding-left: rem(10);
  }

  &__title {
    position: relative;
    transition: opacity 0.1s ease-in-out;
    &--hide {
      opacity: 0;
    }
  }

  &__icon {
    transition: opacity 0.1s ease-in-out;
    width: 16px;
    height: 16px;
    padding: 0 5px 0 0;
    &--hide {
      opacity: 0;
    }
  }

  &--primary {
    color: white;
    background-color: #6564db;

    &:hover {
      background-color: #4e4cb3;
    }
  }

  &--outline {
    border-color: gray;

    &:hover {
      background-color: rgb(212, 212, 212);
    }
  }
  &--red {
    color: white;
    background-color: #fb4d3d;

    &:hover {
      background-color: #da3f31;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
