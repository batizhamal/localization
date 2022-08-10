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
        <AppInputFile
          title="Upload RU"
          @change="readFile('ru', ...arguments)"
        />
      </div>
      <div>
        <AppInputFile
          title="Upload KZ"
          :disabled="!ru"
          @change="readFile('kz', ...arguments)"
        />
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
    console.log("created");
    this.ru = JSON.parse(localStorage.getItem("ru"));
    this.kz = JSON.parse(localStorage.getItem("kz")) ?? {};
    this.codes = JSON.parse(localStorage.getItem("codes")) ?? [];
  },
  methods: {
    onChange(json, keys, value) {
      this[json] = JSON.parse(localStorage.getItem(json));
      keys.reduce((self, key) => {
        if (typeof self[key] != "object") {
          self[key] = value;
          return;
        }
        return self[key];
      }, this[json]);
      localStorage.setItem(json, JSON.stringify(this[json]));
    },
    getItem(json, keys) {
      return keys.reduce((self, key) => {
        if (!self) {
          return null;
        }
        return self[key];
      }, json);
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
