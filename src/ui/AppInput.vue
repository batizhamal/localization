<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
      :name="name"
      :id="id"
      :required="required"
      :type="type"
      :placeholder="placeholder"
      :class="classList"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    name: String,
    id: String,
    required: {
      type: Boolean,
      default: false,
    },
    label: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
  },
  computed: {
    classList() {
      return {
        input: true,
        "input--error": this.value == "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  $self: &;
  width: calc(100% - 11px);
  height: calc(3rem - 2px);
  padding: 0 5px;
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: #eeeeee;
  outline: none;

  &:focus {
    outline: none;
  }

  &--error {
    outline: none;
    // border: 1px solid #fb4d3d;
    background-color: #ffe2e0;

    &:focus {
      outline: none;
      // border: 1px solid #fb4d3d;
      background-color: #ffe2e0;
    }
  }
}

div {
  display: inline-block;
  width: 100%;
}
</style>
