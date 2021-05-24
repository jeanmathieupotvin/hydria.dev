/*!
 * =============================================================================
 * ejs-builder
 * =============================================================================
 * 
 * Compile multiple ejs templates at once
 * 
 * Copyright (c) 2021 Jean-Mathieu Potvin
 * MIT License
 */

'use strict';

/**
 * Dependencies.
 */

const fs     = require('fs');
const path   = require('path');
const ejs    = require('ejs');
const colors = require('colors');

/**
 * Import configurations. Destructure them.
 */

let { 
    srcDir, 
    outDir, 
    partialsBuild, 
    partialsPrefix, 
    verbose, 
    options, 
    globalVariables
} = require('./ejs.config');

/**
 * Resolve directories.
 */

srcDir = path.resolve(srcDir);
outDir = path.resolve(outDir);

/**
 * List all input ejs files in source directory.
 */

// List relative inputs.
let relInputs = fs.readdirSync(srcDir).filter(f => f.indexOf('.ejs') > -1);

// Remove partials from inputs if partialsBuild is false.
// TODO: make this feature recursive, so that it can build
// all .ejs files in sub-folders [assignee: JMP].
if (!partialsBuild) {
    relInputs = relInputs.filter(f => f.indexOf(partialsPrefix) === -1);
}

// Construct absolute paths to inputs.
let absInputs = relInputs.map(f => path.join(srcDir, f));

// Pad absolute paths to inputs for clear console logs.
let consAbsInputs = absInputs;

if (verbose) {
    let maxLen = Math.max(...absInputs.map(e => e.length));
    consAbsInputs = absInputs.map(e => e.padEnd(maxLen - e.length, ' '));
}

/**
 * Map inputs to (future) outputs.
 */

let absOutputs = relInputs
    .map(f => f.replace('.ejs', '.html'))
    .map(f => path.join(outDir, f));

/**
 * Compile views.
 */

absInputs.forEach((input, index) => {
    ejs.renderFile(input, globalVariables, options, (err, str) => {
        // If there is any error, stop and throw it.
        if (err) {
            throw new Error(err);
        }
        
        // Write output to new file in output directory.
        fs.writeFileSync(absOutputs[index], str);

        // Log what happened.
        if (verbose) {
            console.log(`${consAbsInputs[index].blue} => ${absOutputs[index].yellow}`);
        }
    });
});
