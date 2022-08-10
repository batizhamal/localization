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
          if (this.ru) {
            this.initCodes(this.ru);
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

    initCodes(obj, path = [], pathLen = 0) {
      if (Array.isArray(obj)) {
        pathLen++;
        obj.forEach((item, index) => {
          path[pathLen] = index;
          this.initCodes(item, path, pathLen);
        });
        return;
      }

      if (typeof obj === "object" && !Array.isArray(obj)) {
        pathLen++;
        Object.keys(obj).forEach((key) => {
          path[pathLen] = key;
          this.initCodes(obj[key], path, pathLen);
        });
        return;
      }

      this.savePathArrayAsCode(path);
      path.splice(pathLen);
    },
  },
};
