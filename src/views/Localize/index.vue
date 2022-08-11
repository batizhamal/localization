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
        <AppInputFile title="Upload KZ" :disabled="!ru" @change="readFile" />
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
      ru: {},
      kz: {},
      codes: [],
    };
  },
  created() {
    console.log("created");
    this.ru = JSON.parse(localStorage.getItem("ru"));
    this.kz = JSON.parse(localStorage.getItem("kz")) ?? {};
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

      if (filename == "ru") {
        this.ru = data;
        localStorage.setItem("ru", JSON.stringify(this.ru));
        this.codes = [];
        this.kz = cloneDeep(this.ru);
        this.initCodes();
        localStorage.setItem("codes", JSON.stringify(this.codes));
        localStorage.setItem("kz", JSON.stringify(this.kz));
      }
      if (filename == "kz") {
        fillDelta(this.kz, data);
        localStorage.setItem("kz", JSON.stringify(this.kz));
      }
    },

    savePathArrayAsCode(path) {
      this.codes.push([...path.slice(1)]);
    },

    initCodes(obj1 = this.ru, obj2 = this.kz, path = [], pathLen = 0) {
      if (Array.isArray(obj1)) {
        pathLen++;
        obj1.forEach((item, index) => {
          path[pathLen] = index;
          if (typeof obj2[index] != "object") {
            obj2[index] = "";
          }
          this.initCodes(item, obj2[index], path, pathLen);
        });
        return;
      }
      if (typeof obj1 === "object" && !Array.isArray(obj1)) {
        pathLen++;
        Object.keys(obj1).forEach((key) => {
          path[pathLen] = key;
          if (typeof obj2[key] != "object") {
            obj2[key] = "";
          }
          this.initCodes(obj1[key], obj2[key], path, pathLen);
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
