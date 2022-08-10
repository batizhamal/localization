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
  width: 90%;
  max-width: 100%;
  height: 2rem;
  border-color: transparent;
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 0 5px;

  &:focus {
    background-color: #f1f1f1;
    outline: 1px solid #c5c5c5;
  }

  &--error {
    background-color: #f0dcda;
    outline: 1px solid #fb4d3d;

    &:focus {
      background-color: #ffd5d2;
      outline: 1px solid #fb4d3d;
    }
  }
}

div {
  display: inline-block;
  width: 100%;
}
</style>
