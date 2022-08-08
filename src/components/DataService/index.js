export default {
  methods: {
    downloadJson(filename = "kz", data) {
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      a.href = URL.createObjectURL(file);
      a.download = `${filename}`;
      a.click();
    },
    // TODO: object parsing method here
  },
};
