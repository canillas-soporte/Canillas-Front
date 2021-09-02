import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Crea alias para importar ficheros sin colocar ruta absoluta.
import alias from '@rollup/plugin-alias';

/** Bare modules para importar modulos de la libreria de lit-html.
 * import { html } from 'lit-html';
 * 
 * Los navegadores solo aceptan cargar modulos de URLs o rutas relaivas.
 * No bare-names que hagan referencia a paquetes de npm (@babel/plugin-babel)
 */
import resolve from '@rollup/plugin-node-resolve';
/** Compatibilidad con navegadores antiguos */
import babel from '@rollup/plugin-babel';
/** Minifica Javascript */
import { terser } from 'rollup-plugin-terser';
/** Optimización extra */
import minifyHTML from 'rollup-plugin-minify-html-literals';
/** Copia ficheros estáticos en la carpeta de build */
import copy from 'rollup-plugin-copy';
import uglify from "@lopatnov/rollup-plugin-uglify";
import commonjs from 'rollup-plugin-commonjs';
// Compila los decoradores de lit-element a JS nativo
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

// Live server para desplegar
import { liveServer } from 'rollup-plugin-live-server';

import multi from '@rollup/plugin-multi-entry';

import replace from 'rollup-plugin-replace';

const copyConfig = {
    targets: [
        { src: 'node_modules/@webcomponents', dest: 'build-modern/node_modules' },
        { src: 'images', dest: 'build-modern' },
        { src: 'data', dest: 'build-modern' },
        { src: 'index.html', dest: 'build-moden' }
    ]
}

const babelConfig = {
    babelrc: false,
    exclude: 'node_modules/**',
    ...{
        presets: [
            [
                '@babel/preset-env', {
                    targets: {
                        ie: '11'
                    }
                }
            ]
        ]
    }
}

//bundle configuration

const configs = [
    // The main JavaScript bundle for older browsers that don't support
    // JavaScript modules or ES2015+.
    {
        input: ['src/components/shop-app.js'],
        output: {
            dir: 'build-universal/nomodule/src/components',
            format: 'systemjs',
        },
        plugins: [
            minifyHTML(),
            babel(babelConfig),
            resolve(),
            copy(copyConfig),
            ,
            inlineLitElement(),
        ],
        preserveEntrySignatures: false,
    },
    // Babel polyfills for older browsers that don't support ES2015+.
    {
        input: 'src/babel-polyfills-nomodule.js',
        output: {
            file: 'build-universal/nomodule/src/babel-polyfills-nomodule.js',
            format: 'iife',
        },
        plugins: [commonjs({ include: ['node_modules/**'] }), resolve()],
    }
];

const config = {
    input: ['src/components/shop-app.js', 'src/components/**/*.js'],
    output: {
        dir: `build-modern/src/`,
        format: 'es'
    },
    plugins: [
        multi(),
        babel(babelConfig),
        minifyHTML(),
        copy(copyConfig),
        resolve(),
        replace({
            // Recogemos el valor y lo convertimos
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        alias({
            find: '@Components', replacement: './components',
            find: '@Utilities', replacement: './utilities'
        })
    ],
    preserveEntrySignatures: false,
}

if (process.env.NODE_DEV === "watch") {
    config.plugins.push(
        liveServer({
            port: 8001,
            host: "127.0.0.1",
            root: "build-modern",
            file: "index.html",
            mount: [['/dist', './dist'], ['/src', './src'], ['/node_modules', './node_modules']],
            open: false,
            wait: 500
        }))
}

if (process.env.NODE_DEV !== 'development') {
    config.plugins.push(terser());
    config.plugins.push(uglify());
}

export default config;