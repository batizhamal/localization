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
    };
  },
  methods: {
    downloadJson(fileName = "kz") {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(this[fileName])], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(file);
      a.download = `${fileName}`;
      a.click();
    },

    readFile(fileName = "ru", file) {
      this.files[fileName] = file;

      if (this.files[fileName].name.includes(".json")) {
        this.reader.onload = (res) => {
          this[fileName] = JSON.parse(res.target.result);
          localStorage.setItem(fileName, JSON.stringify(this[fileName]));
        };

        this.reader.onerror = (err) => {
          console.log(err);
        };

        this.reader.readAsText(this.files[fileName]);
      }
    },
    // TODO: object parsing method here
  },
};
