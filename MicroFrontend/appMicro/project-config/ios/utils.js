const fs = require('fs');
const path = require('path');

const removePrefixedFiles = (dir, prefix) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error leyendo el directorio ${dir}: ${err.message}`);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        removePrefixedFiles(filePath, prefix);
      } else if (file.name.startsWith(prefix)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(
              `Error eliminando el archivo ${filePath}: ${err.message}`
            );
          }
        });
      }
    });
    console.log('Archivos eliminados del directorio ' + dir);
  });
};

const deleteAllExcept = (dir, exceptFile) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error leyendo el directorio ${dir}: ${err.message}`);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        deleteAllExcept(filePath, exceptFile);
      } else if (file.name !== exceptFile) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(
              `Error eliminando el archivo ${filePath}: ${err.message}`
            );
          }
        });
      }
    });
    console.log('Archivos eliminados del directorio ' + dir);
  });
};

module.exports = { removePrefixedFiles, deleteAllExcept };
