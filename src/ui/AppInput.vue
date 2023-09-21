<template>
  <div>
    <label
      v-if="label"
      :for="id"
    >{{ label }}</label>
    <input
      :id="id"
      :value="value"
      :name="name"
      :required="required"
      :type="type"
      :placeholder="placeholder"
      :class="classList"
      @input="$emit('input', $event.target.value)"
      @click="toggleVisible"
    >
    <div
      v-show="showHints"
      class="hints"
    >
      <ul>
        <li
          v-for="(hint, index) in hints"
          :key="`hint-${index}`"
          @click="hintClicked(index)"
          v-text="hint"
        />
      </ul>
    </div>
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
    warn: {
      type: Boolean,
      default: false,
    },
    hints: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    showHints() {
      if (!this.visible) {
        return false;
      }
      return this.hints.length != 0 && this.value == "";
    },
    classList() {
      return {
        input: true,
        "input--error": this.value == "",
        "input--warn": this.warn,
      };
    },
    matches() {
      if (this.value == "") {
        return [];
      }
      return this.hints.filter((hint) => hint.includes(this.value));
    },
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    hintClicked(index) {
      this.$emit("input", this.hints[index]);
      this.toggleVisible();
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
  font-size: 1rem;

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

  &--warn {
    outline: none;
    background-color: rgb(255, 243, 224);
  }
}

div {
  display: inline-block;
  width: 100%;
  position: relative;
}

.hints {
  position: absolute;
  top: calc(3rem - 2px);
  left: 0;
  z-index: 2;
  width: 100%;
  height: auto;
  max-height: 150px;
  min-height: 0px;
  // overflow-y: scroll;
  box-shadow: 0 10px 10px 0 rgba($color: #000000, $alpha: 0.1);
}

.hints ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
  margin: 0;
}
.hints ul li {
  padding: 10px;
  cursor: pointer;
  background: #ffffff;
}

.hints ul li:hover {
  background: #cfcfcf;
}

::-webkit-scrollbar {
  background-color: #fafafa;
  width: 10px;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 1rem;
  border: 0;
}
</style>
