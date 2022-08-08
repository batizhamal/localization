<template>
  <div>
    <input type="file" ref="file" class="file" @change="readRuFile()" />
    <AppButton
      icon="https://super.so/icon/light/upload.svg"
      title="Upload RU"
      @click="$refs.file.click()"
      primary
    />

    <div v-if="ru">
      <div v-for="(code, index) in getCodes()" :key="`code-${index}`">
        <p>{{ code }}</p>
        <input type="text" v-model="ru[code]" />
        <input type="text" v-model="kz[code]" />
      </div>
    </div>
    <AppButton
      icon="https://super.so/icon/light/download.svg"
      title="Download KZ"
      @click="downloadKz()"
      primary
    />
  </div>
</template>

<script>
import AppButton from "@/ui/AppButton.vue";
export default {
  components: {
    AppButton,
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
    downloadKz() {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(this.kz)], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = "kz";
      console.log(a);
      a.click();
    },
  },
};
</script>

<style lang="scss">
.file {
  display: none;
}
</style>
