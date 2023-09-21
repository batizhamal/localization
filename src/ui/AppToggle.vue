<template>
  <div class="toggle">
    <p class="toggle__label">
      {{ label }}
    </p>
    <span
      class="toggle__wrapper"
      @click="$emit('toggle')"
    >
      <span
        class="toggle__background"
        :class="backgroundStyles"
      />
      <span
        class="toggle__indicator"
        :class="indicatorStyles"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
  },
  computed: {
    backgroundStyles() {
      return {
        grey: !this.value,
        blue: this.value,
      };
    },
    indicatorStyles() {
      return {
        on: this.value,
        off: !this.value,
      };
    },
  },
};
</script>

<style lang="scss">
.toggle {
  $self: &;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;

  &__wrapper {
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 9999px;

    &:focus {
      outline: 0;
    }
  }

  &__background {
    display: inline-block;
    border-radius: 9999px;
    height: 100%;
    width: 100%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.4s ease;
  }

  &__indicator {
    position: absolute;
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: #ffffff;
    border-radius: 9999px;
    box-shadow: 0 2 px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }

  &__label {
    display: inline-block;
  }
}
.grey {
  background-color: #c2c2c2;
}
.blue {
  background-color: #1890ff;
}
.on {
  transform: translateX(16px);
}
.off {
  transform: translateX(0);
}
</style>
