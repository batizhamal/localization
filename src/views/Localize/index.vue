<template>
  <div class="root">
    <AppPanel class="box__row">
      <!--TODO: handle the upload methods -->
      <div></div>
      <div>
        <input type="file" ref="file" class="file" @change="readRuFile()" />
        <AppButton
          icon="https://super.so/icon/light/upload.svg"
          title="Upload RU"
          @click="$refs.file.click()"
          primary
        />
      </div>
      <div>
        <!-- TODO: add input type file -->
        <AppButton
          icon="https://super.so/icon/light/upload.svg"
          title="Upload KZ"
          primary
        />
      </div>
    </AppPanel>

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

    <AppPanel class="box__row">
      <!-- TODO: refactor the download methods -->
      <div></div>
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download RU"
          @click="downloadRu()"
          primary
        />
      </div>
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download KZ"
          @click="downloadKz()"
          primary
        />
      </div>
    </AppPanel>
  </div>
</template>

<script>
import AppButton from "@/ui/AppButton.vue";
import AppPanel from "@/ui/AppPanel.vue";
import AppInput from "@/ui/AppInput.vue";
export default {
  components: {
    AppPanel,
    AppButton,
    AppInput,
  },
  data: () => ({
    file: null,
    ru: {},
    kz: {},
    reader: new FileReader(),
  }),
  created() {
    if (!this.file) {
      this.ru = JSON.parse(localStorage.getItem("ru"));
    }
  },
  methods: {
    readRuFile() {
      this.file = this.$refs.file.files[0];

      if (this.file.name.includes(".json")) {
        this.reader.onload = (res) => {
          this.ru = JSON.parse(res.target.result);
          localStorage.setItem("ru", JSON.stringify(this.ru));
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(this.file);
      }
    },
    getCodes() {
      return Object.keys(this.ru);
    },
    downloadRu() {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(this.ru)], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(file);
      a.download = "ru";
      a.click();
    },
    downloadKz() {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(this.kz)], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(file);
      a.download = "kz";
      a.click();
    },
  },
};
</script>

<style lang="scss">
.root {
  width: 100%;
}

.file {
  display: none;
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
