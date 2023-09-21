<template>
  <div class="box">
    <table>
      <thead>
        <tr class="head__row">
          <th class="head__col head__col--num">
            <span>RU</span>
          </th>
          <th class="head__col head__col--code" />
          <th class="head__col">
            <span />
            <div class="head__buttons">
              <AppInputFile
                icon-color="grey-to-blue"
                :title="null"
                clear
                @change="$emit('readFile', ...arguments)"
              />
              <AppButton
                icon="download"
                icon-color="grey-to-blue"
                clear
                @click="$emit('download', 'ru')"
              />
            </div>
          </th>
          <th class="head__col">
            <span class="ml-1">KZ</span>
            <div class="head__buttons">
              <AppInputFile
                icon-color="grey-to-blue"
                :title="null"
                clear
                @change="$emit('readFile', ...arguments)"
              />
              <AppButton
                icon="download"
                icon-color="grey-to-blue"
                clear
                @click="$emit('download', 'kz')"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(code, index) in codes"
          :key="`row-${index}`"
          class="body__row"
        >
          <td class="body__col body__col--num">
            <p>{{ index }}</p>
          </td>
          <td class="body__col body__col--code">
            <p class="ml-1">
              {{ code.join("::") }}
            </p>
          </td>
          <td class="body__col">
            <AppInput
              type="text"
              :value="getItem(ru, code)"
              placeholder="Введите текст"
              :warn="isNotSame(code)"
              @input="(val) => $emit('onChange', 'ru', code, val)"
            />
          </td>
          <td class="body__col">
            <AppInput
              type="text"
              :value="getItem(kz, code)"
              placeholder="Введите текст"
              :warn="isNotSame(code)"
              :hints="getKzHints(code)"
              @input="(val) => $emit('onChange', 'kz', code, val)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppInput from "@/ui/AppInput.vue";
import AppButton from "@/ui/AppButton.vue";
import AppInputFile from "@/ui/AppInputFile.vue";
import { getItem } from "@/components/service/JsonService";
import { translate } from "@/api/google-translate";

export default {
  components: {
    AppInput,
    AppButton,
    AppInputFile,
  },
  props: {
    codes: Array,
    kz: Object,
    ru: Object,
    checkSame: {
      type: Boolean,
      default: false,
    },
    showHints: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getItem,

    isNotSame(code) {
      if (!this.checkSame) {
        return false;
      }

      const val1 = getItem(this.ru, code);
      const val2 = getItem(this.kz, code);

      if (val1 == "" || val2 == "") {
        return false;
      }

      return val1 != val2;
    },

    getKzHints(code) {
      if (!this.showHints) {
        return [];
      }
      const val = getItem(this.ru, code);
      const hints = [];
      translate(val, "kk")
        .then((res) => {
          hints.push(...this.matchCase(val, res));
        })
        .catch((err) => {
          console.log(err);
        });
      return hints;
    },

    matchCase(val, translations) {
      return translations.map((el) => {
        if (val.charAt(0).toUpperCase() == val.charAt(0)) {
          return el.charAt(0).toUpperCase() + el.slice(1);
        }
        return el;
      });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/vars.scss";
table {
  $self: &;

  width: 100%;
  border-collapse: collapse;
  max-width: 100%;
}

thead {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fafafa;
}

tr.head__row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 39px;
  width: 100%;
  max-width: 100%;
}

th.head__col {
  max-width: 35%;
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: #eeeeee;

  &--num {
    max-width: 2rem;
    width: 2rem;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #eeeeee;
    padding: 0;
    padding-left: 1rem;
  }
  &--code {
    max-width: calc(30% - 2rem);
    width: calc(30% - 2rem);
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: #eeeeee;
    padding: 0;
  }
}

div.head__buttons {
  display: flex;
  gap: 0.3rem;
}

tbody {
  width: 100%;
  max-width: 100%;
}

tr.body__row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 3rem;
  width: 100%;
  max-width: 100%;
}
td.body__col {
  max-width: 35%;
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0;
  border: none;

  &--num {
    max-width: 2rem;
    width: 2rem;
    padding: 0;
    padding-left: 1rem;
    background-color: #fafafa;
    border-width: 0px 1px 1px 0px;
    border-style: solid;
    border-color: #eeeeee;
  }
  &--code {
    max-width: calc(30% - 2rem);
    width: calc(30% - 2rem);
    padding: 0;
    background-color: #fafafa;
    border-width: 0px 1px 1px 0px;
    border-style: solid;
    border-color: #eeeeee;
  }
}

.box {
  $self: &;

  height: calc(100vh - $panel_height);
  width: 100vw;
  overflow-y: scroll;
  position: relative;
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
