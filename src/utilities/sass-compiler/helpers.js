const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const path = require('path');
const fsp = require('fs').promises;

// Itera de forma asíncrona un directorio y devuelve un array de rutas de los archivos
var walk = module.exports.walk = async function (dir, fileList = []) {
    const files = await fsp.readdir(dir)
    for (const file of files) {
        const stat = await fsp.stat(path.join(dir, file))
        if (stat.isDirectory()) fileList = await walk(path.join(dir, file), fileList)
        else fileList.push(path.join(dir, file))
    }
    return fileList
}

// Utiliza el writeFile del fs de Node pero checkea antes la ruta para crearla si no existe
var writeFile = module.exports.writeFile = function(path, contents, cb) {
    mkdirp(getDirName(path), function (err) {
        if (err) return cb(err);

        fsp.writeFile(path, contents, cb);
    });
}