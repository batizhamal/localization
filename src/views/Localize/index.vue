<template>
  <div class="root">
    <div class="panel">
      <div>
        <AppInputFile
          title="Загрузить файл"
          icon-color="white"
          :loading="loading"
          @change="readFile"
        />
        <AppButton
          icon="trash"
          title="Очистить всё"
          outline
          @click="clearStorage"
        />
      </div>
      <div>
        <AppToggle
          :value="checkSame"
          label="Подсветка разных полей"
          @toggle="checkSame = !checkSame"
        />
        <div class="vertical-line" />
        <AppToggle
          :value="showHints"
          label="Google Translate"
          @toggle="showHints = !showHints"
        />
      </div>
    </div>

    <div v-show="isEmpty" class="message">
      <AppIcon icon="alert" width="48" height="48" class="mb-1" />
      <span>Таблица пустая.<br />Загрузите файлы чтобы начать работать.</span>
    </div>

    <MTable
      :codes="codes"
      :kz="kz"
      :ru="ru"
      :check-same="checkSame"
      :show-hints="showHints"
      @onChange="onChange"
      @readFile="readFile"
      @download="downloadFile"
    />
  </div>
</template>

<script>
import AppButton from "@/ui/AppButton.vue";
import AppInputFile from "@/ui/AppInputFile.vue";
import AppToggle from "@/ui/AppToggle.vue";
import AppIcon from "@/ui/AppIcon.vue";
import MTable from "./components/MTable.vue";
import { uploadJson, downloadJson } from "@/components/service/FileService";
import { setItem, fillDelta } from "@/components/service/JsonService";
import { cloneDeep } from "lodash";

export default {
  components: {
    AppButton,
    AppInputFile,
    AppToggle,
    AppIcon,
    MTable,
  },
  data: () => {
    return {
      kz: {},
      ru: {},
      codes: [],
      checkSame: false,
      showHints: false,
      loading: false,
    };
  },
  computed: {
    isEmpty() {
      return this.codes.length == 0;
    },
  },
  async created() {
    ["kz", "ru"].forEach((el) => {
      this[el] = JSON.parse(localStorage.getItem(el)) ?? {};
    });

    this.codes = JSON.parse(localStorage.getItem("codes")) ?? [];
  },
  methods: {
    downloadFile(lang) {
      downloadJson(lang, this[lang]);
    },

    onChange(fileName, keys, value) {
      this[fileName] = JSON.parse(localStorage.getItem(fileName));
      setItem(this[fileName], keys, value);
      localStorage.setItem(fileName, JSON.stringify(this[fileName]));
    },

    async readFile(file) {
      this.loading = true;
      try {
        const data = await uploadJson(file);

        const filename = this.isEmpty ? "ru" : "kz";

        // загружается самый первый файл - primary
        if (this.isEmpty) {
          this[filename] = data;
          localStorage.setItem(filename, JSON.stringify(this[filename]));
          ["kz", "ru"].forEach((lang) => {
            this[lang] = cloneDeep(this[filename]);
          });

          const secondaryFiles = ["kz", "ru"]
            .filter((lang) => lang != filename)
            .map((lang) => this[lang]);

          this.initCodes(this[filename], secondaryFiles);

          ["kz", "ru", "codes"].forEach((el) => {
            localStorage.setItem(el, JSON.stringify(this[el]));
          });
        }

        // загружаются остальные файлы, когда уже есть primary
        fillDelta(this.codes, this[filename], data);
        localStorage.setItem(filename, JSON.stringify(this[filename]));
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    savePathArrayAsCode(path) {
      this.codes.push([...path.slice(1)]);
    },

    initCodes(primary, [sec1], path = [], pathLen = 0) {
      if (Array.isArray(primary)) {
        pathLen++;
        primary.forEach((item, index) => {
          path[pathLen] = index;
          if (typeof primary[index] != "object") {
            sec1[index] = "";
          }
          this.initCodes(item, [sec1[index]], path, pathLen);
        });
        path.splice(pathLen);
        return;
      }
      if (typeof primary === "object" && !Array.isArray(primary)) {
        pathLen++;
        Object.keys(primary).forEach((key) => {
          path[pathLen] = key;
          if (typeof primary[key] != "object") {
            sec1[key] = "";
          }
          this.initCodes(primary[key], [sec1[key]], path, pathLen);
        });
        path.splice(pathLen);
        return;
      }
      this.savePathArrayAsCode(path);
      path.splice(pathLen);
    },

    clearStorage() {
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/vars";
.root {
  width: 100%;
  margin: 0;
}

.panel {
  $self: &;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: $panel_height;
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;

  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
}

.message {
  $self: &;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  justify-items: center;
  text-align: center;

  & > span {
    display: block;
  }
}
</style>
