<template>
  <div class="root">
    <div class="panel box__row">
      <div></div>
      <div>
        <AppInputFile title="Upload RU" @change="readRuFile" />
      </div>
      <div>
        <AppInputFile title="Upload KZ" @change="readKzFile" />
      </div>
    </div>

    <div v-if="ru" class="box">
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
          @click="downloadJson('ru', ru)"
          primary
        />
      </div>
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download KZ"
          @click="downloadJson('kz', kz)"
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
  data: () => ({
    files: {
      ru: null,
      kz: null,
    },
    ru: {},
    kz: {},
    reader: new FileReader(),
  }),
  created() {
    if (!this.files.ru) {
      this.ru = JSON.parse(localStorage.getItem("ru"));
    }
    if (!this.files.kz && localStorage.getItem("kz")) {
      this.kz = JSON.parse(localStorage.getItem("kz"));
    }
  },
  methods: {
    // downloadJson,
    readRuFile(file) {
      this.files.ru = file;

      if (this.files.ru.name.includes(".json")) {
        this.reader.onload = (res) => {
          this.ru = JSON.parse(res.target.result);
          localStorage.setItem("ru", JSON.stringify(this.ru));
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(this.files.ru);
      }
    },
    readKzFile(file) {
      this.files.kz = file;

      if (this.files.kz.name.includes(".json")) {
        this.reader.onload = (res) => {
          this.kz = JSON.parse(res.target.result);
          localStorage.setItem("kz", JSON.stringify(this.kz));
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(this.files.kz);
      }
    },
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
