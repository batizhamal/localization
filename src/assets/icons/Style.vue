<script>
export default {
  props: {
    color: {
      type: String,
      default: "black",
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

<style lang="scss">
.black {
  fill: #1c1b1f;
}

.grey {
  fill: #8c8c8c;
}

.white {
  fill: white;
}

.blue {
  fill: #1890ff;
}

.red {
  fill: #ff4d4f;
}

.grey-to-black {
  $self: &;
  fill: #8c8c8c;
  &:hover {
    fill: #1c1b1f;
  }
}
.grey-to-blue {
  $self: &;
  fill: #8c8c8c;
  &:hover {
    fill: #1890ff;
  }
}
.grey-to-red {
  $self: &;
  fill: #8c8c8c;
  &:hover {
    fill: #ff4d4f;
  }
}
</style>
