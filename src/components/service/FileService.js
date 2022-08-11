export const downloadJson = (filename, json) => {
  const data = JSON.stringify(json).replaceAll(",", ",\n");
  const a = document.createElement("a");
  const file = new Blob([data], {
    type: "application/json",
  });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
};

export const uploadJson = async (file) => {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (res) => {
      resolve(JSON.parse(res.target.result));
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });
};
