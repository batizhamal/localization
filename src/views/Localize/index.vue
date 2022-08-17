<template>
  <div class="root">
    <div class="panel">
      <div>
        <AppInputFile
          title="Upload file"
          icon-color="white"
          @change="readFile"
        />
        <AppButton
          icon="trash"
          title="Clear all"
          outline
          @click="clearStorage"
        />
      </div>
      <!-- <div>
        <AppButton
          icon="download"
          title="Download all"
          outline
          :disabled="true"
        />
      </div> -->
    </div>

    <div
      v-show="isEmpty"
      class="message"
    >
      <img src="https://super.so/icon/dark/alert-triangle.svg">
      <span>Nothing to display.<br>Upload files to start working.</span>
    </div>

    <MTable
      :codes="codes"
      :kz="kz"
      :ru="ru"
      @onChange="onChange"
      @readFile="readFile"
      @download="downloadFile"
    />
  </div>
</template>

<script>
import AppButton from "@/ui/AppButton.vue";
import AppInputFile from "@/ui/AppInputFile.vue";
import MTable from "./components/MTable.vue";
import { uploadJson, downloadJson } from "@/components/service/FileService";
import { setItem, fillDelta } from "@/components/service/JsonService";
import { cloneDeep } from "lodash";

export default {
  components: {
    AppButton,
    AppInputFile,
    MTable,
  },
  data: () => {
    return {
      kz: {},
      ru: {},
      codes: [],
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

  & > img {
    width: 3rem;
    height: 3rem;
    margin-bottom: 20px;
  }

  & > span {
    display: block;
  }
}
</style>
