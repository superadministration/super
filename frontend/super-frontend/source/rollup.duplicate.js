const fs = require("fs");
const path = require("path");

export default function duplicateFile() {
  return {
    name: "duplicateFile",
    writeBundle: function writeBundle(options, bundle) {
      for (let key in bundle) {
        let value = bundle[key];
        var basename = path.basename(value.fileName);
        var destDir = path.join(__dirname, "../dist");
        var destPath = path.join(destDir, basename);

        if (value.source) {
          fs.writeFileSync(destPath, value.source);
        } else if (value.code) {
          fs.writeFileSync(destPath, value.code);
        }
      }
    },
  };
}
