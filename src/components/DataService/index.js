import { cloneDeep } from "lodash";
import { TreeNode } from "../Tree/TreeNode";

export default {
  data: () => {
    return {
      ru: {},
      kz: {},
      codes: [],
      reader: new FileReader(),
      keys: new TreeNode("keys"),
    };
  },
  methods: {
    downloadJson(fileName) {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(this[fileName])], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(file);
      a.download = `${fileName}`;
      a.click();
    },

    readFile(fileName, file) {
      if (file.name.includes(".json")) {
        this.reader.onload = (res) => {
          this[fileName] = JSON.parse(res.target.result);
          localStorage.setItem(fileName, JSON.stringify(this[fileName]));

          if (fileName == "ru") {
            this.kz = cloneDeep(this.ru);
            this.initCodes();
            localStorage.setItem("codes", JSON.stringify(this.codes));
            localStorage.setItem("kz", JSON.stringify(this.kz));
          }
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(file);
      }
    },

    savePathArrayAsCode(path) {
      this.codes.push([...path.slice(1)]);
    },

    initCodes(obj = this.ru, obj2 = this.kz, path = [], pathLen = 0) {
      if (Array.isArray(obj)) {
        pathLen++;
        obj.forEach((item, index) => {
          path[pathLen] = index;
          if (typeof obj2[index] != "object") {
            obj2[index] = "";
          }
          this.initCodes(item, obj2[index], path, pathLen);
        });
        return;
      }

      if (typeof obj === "object" && !Array.isArray(obj)) {
        pathLen++;
        Object.keys(obj).forEach((key) => {
          path[pathLen] = key;
          if (typeof obj2[key] != "object") {
            obj2[key] = "";
          }
          this.initCodes(obj[key], obj2[key], path, pathLen);
        });
        return;
      }

      this.savePathArrayAsCode(path);
      path.splice(pathLen);
    },
  },
};
