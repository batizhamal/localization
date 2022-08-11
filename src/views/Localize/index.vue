<template>
  <div class="root">
    <div class="panel box__row">
      <div>
        <AppButton
          icon="https://super.so/icon/light/trash-2.svg"
          title="Clear"
          v-show="ru"
          @click="clearStorage"
          red
        />
      </div>
      <div>
        <AppInputFile title="Upload RU" @change="readFile" />
      </div>
      <div>
        <AppInputFile title="Upload KZ" @change="readFile" />
      </div>
      <div>
        <AppInputFile title="Upload EN" @change="readFile" />
      </div>
    </div>

    <div class="message" v-show="isEmpty">
      <img src="https://super.so/icon/dark/alert-triangle.svg" />
      <span>Nothing to display.<br />Upload files to start working.</span>
    </div>

    <div class="box">
      <div
        v-for="(code, index) in codes"
        :key="`code-${index}`"
        class="box__row"
      >
        <div>
          <p>{{ code.join("::") }}</p>
        </div>
        <div>
          <AppInput
            type="text"
            :value="getItem(ru, code)"
            @input="(val) => onChange('ru', code, val)"
          ></AppInput>
        </div>
        <div>
          <AppInput
            type="text"
            :value="getItem(kz, code)"
            @input="(val) => onChange('kz', code, val)"
          ></AppInput>
        </div>
        <div>
          <AppInput
            type="text"
            :value="getItem(en, code)"
            @input="(val) => onChange('en', code, val)"
          ></AppInput>
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
      <div>
        <AppButton
          icon="https://super.so/icon/light/download.svg"
          title="Download EN"
          @click="downloadJson('en', en)"
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
import { uploadJson, downloadJson } from "@/components/service/FileService";
import { setItem, getItem, fillDelta } from "@/components/service/JsonService";
import { cloneDeep } from "lodash";

export default {
  components: {
    AppButton,
    AppInput,
    AppInputFile,
  },
  data: () => {
    return {
      kz: {},
      ru: {},
      en: {},
      codes: [],
    };
  },
  created() {
    console.log("created");

    ["kz", "ru", "en"].forEach((el) => {
      this[el] = JSON.parse(localStorage.getItem(el)) ?? {};
    });

    this.codes = JSON.parse(localStorage.getItem("codes")) ?? [];
  },
  computed: {
    isEmpty() {
      return this.codes.length == 0;
    },
  },
  methods: {
    downloadJson,
    getItem,

    onChange(fileName, keys, value) {
      this[fileName] = JSON.parse(localStorage.getItem(fileName));
      setItem(this[fileName], keys, value);
      localStorage.setItem(fileName, JSON.stringify(this[fileName]));
    },

    async readFile(file) {
      const filename = file.name.split(".")[0];
      const data = await uploadJson(file);

      // загружается самый первый файл - primary
      if (this.isEmpty) {
        this[filename] = data;
        localStorage.setItem(filename, JSON.stringify(this[filename]));
        ["kz", "ru", "en"].forEach((lang) => {
          this[lang] = cloneDeep(this[filename]);
        });

        const secondaryFiles = ["kz", "ru", "en"]
          .filter((lang) => lang != filename)
          .map((lang) => this[lang]);

        this.initCodes(this[filename], secondaryFiles);

        ["kz", "ru", "en", "codes"].forEach((el) => {
          localStorage.setItem(el, JSON.stringify(this[el]));
        });
      }

      // загружаются остальные файлы, когда уже есть primary
      fillDelta(this.codes, this[filename], data);
      localStorage.setItem(filename, JSON.stringify(this[filename]));
    },

    savePathArrayAsCode(path) {
      this.codes.push([...path.slice(1)]);
    },

    initCodes(primary, [secondary1, secondary2], path = [], pathLen = 0) {
      if (Array.isArray(primary)) {
        pathLen++;
        primary.forEach((item, index) => {
          path[pathLen] = index;
          if (typeof primary[index] != "object") {
            secondary1[index] = secondary2[index] = "";
          }
          this.initCodes(
            item,
            [secondary1[index], secondary2[index]],
            path,
            pathLen
          );
        });
        return;
      }
      if (typeof primary === "object" && !Array.isArray(primary)) {
        pathLen++;
        Object.keys(primary).forEach((key) => {
          path[pathLen] = key;
          if (typeof primary[key] != "object") {
            secondary1[key] = secondary2[key] = "";
          }
          this.initCodes(
            primary[key],
            [secondary1[key], secondary2[key]],
            path,
            pathLen
          );
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
      width: 25%;
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
  background-color: #f3f3f3;
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
