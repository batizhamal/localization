<template>
  <div class="root">
    <div class="panel box__row">
      <div></div>
      <div>
        <AppInputFile
          title="Upload RU"
          @change="readFile('ru', ...arguments)"
        />
      </div>
      <div>
        <AppInputFile
          title="Upload KZ"
          @change="readFile('kz', ...arguments)"
        />
      </div>
    </div>

    <div class="box">
      <div
        v-for="(code, index) in getCodes()"
        :key="`code-${index}`"
        class="box__row"
      >
        <div>
          <p>{{ code }}</p>
        </div>
        <div>
          <AppInput type="text" v-model="ru[code]"></AppInput>
        </div>
        <div>
          <AppInput type="text" v-model="kz[code]"></AppInput>
        </div>
      </div>
    </div>

    <div class="panel box__row">
      <div></div>
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download RU"
          @click="downloadJson('ru')"
          primary
        />
      </div>
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download KZ"
          @click="downloadJson('kz')"
          primary
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/ui/AppButton.vue";
import AppInput from "@/ui/AppInput.vue";
import AppInputFile from "@/ui/AppInputFile.vue";
import DataService from "@/components/DataService";

export default {
  extends: DataService,
  components: {
    AppButton,
    AppInput,
    AppInputFile,
  },
  created() {
    if (!this.files.ru && localStorage.getItem("ru")) {
      this.ru = JSON.parse(localStorage.getItem("ru"));
    }
    if (!this.files.kz && localStorage.getItem("kz")) {
      this.kz = JSON.parse(localStorage.getItem("kz"));
    }
  },
  methods: {
    getCodes() {
      return Object.keys(this.ru);
    },
  },
};
</script>

<style lang="scss">
.root {
  width: 100%;
}

.box {
  $self: &;

  padding-left: $padding;
  height: calc(100vh - $panel_height * 2);
  width: calc(100vw - $padding);
  overflow-y: scroll;
  overflow-x: hidden;

  &__row {
    display: flex;
    height: 3rem;
    border-bottom: #b6b6b6;
    align-items: center;

    & > div {
      width: 33.3%;
      float: left;
    }
  }
}

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

::-webkit-scrollbar {
  background-color: transparent;
  width: 1rem;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 1rem;
  border: 0.1rem solid #ffffff;
}
</style>
