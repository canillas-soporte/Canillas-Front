const fs = require('fs');
const path = require('path');
const sass = require('sass');
const helpers = require('./helpers');
const Fiber = require('fibers');
const argv = require('optimist').argv;
const chalk = require('chalk');
const log = console.log;

const DIR = 'src';
const TPL = `${__dirname}/sass-template.txt`;

const TPLContent = fs.readFileSync(TPL, "utf8")
log('Preprocessing custom elements SASS', '\n');

helpers.walk(DIR).then(res => {
    const styles = res.filter(file => file.endsWith('.scss'));
    styles.forEach(SCSSfile => {
        log(`Ẁritting ${SCSSfile} file.`, '\n');
        sass.render({
            file: SCSSfile,
            sourceMap: argv.sourceMap || false,
            sourceMapEmbed: true,
            outputStyle: 'compressed',
            fiber: Fiber
        }, function (err, result) {
            err && log(chalk.red.bold('ERROR'), err);
            if (!err) {
                const _TPL = TPLContent
                    .split('<% content %>')
                    .join(result.css.toString())
                    .split('<% varName %>')
                    .join(path.basename(SCSSfile, '.scss').split('-').join(""))

                fs.writeFileSync(`${path.dirname(SCSSfile)}/${path.basename(SCSSfile, '.scss')}-css.js`, _TPL, {encoding: 'utf8'})
            }
        })
    });
})