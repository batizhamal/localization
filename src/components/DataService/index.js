import { TreeNode } from "../Tree/TreeNode";

export default {
  data: () => {
    return {
      files: {
        ru: null,
        kz: null,
      },
      ru: {},
      kz: {},
      reader: new FileReader(),
      keys: new TreeNode("keys"),
      codes: [],
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
      this.files[fileName] = file;

      if (this.files[fileName].name.includes(".json")) {
        this.reader.onload = (res) => {
          this[fileName] = JSON.parse(res.target.result);
          localStorage.setItem(fileName, JSON.stringify(this[fileName]));

          if (fileName === "ru") {
            this.iterateObject(this.ru, this.keys);
            this.getPath(this.keys, [], 0);
          }
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(this.files[fileName]);
      }
    },

    iterateObject(obj, keys) {
      if (typeof obj === "string") {
        return;
      }

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          keys.children.push(new TreeNode(index));
          this.iterateObject(
            item,
            keys.children.find((el) => el.value === index)
          );
        });
        return;
      }

      if (typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          keys.children.push(new TreeNode(key));
          this.iterateObject(
            obj[key],
            keys.children.find((el) => el.value === key)
          );
        });
      }
    },

    getPath(node, path, pathLen) {
      if (node.value == null) {
        return;
      }

      path[pathLen] = node.value;
      pathLen++;

      if (!node.hasChildren) {
        this.savePathArrayAsCode(path);
        path.splice(pathLen - 1);
        return;
      }

      node.children.forEach((child) => {
        this.getPath(child, path, pathLen);
      });
    },

    savePathArrayAsCode(path) {
      this.codes.push([...path.slice(1)]);
    },
  },
};
