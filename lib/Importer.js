'use strict'

const path = require('path')
const oboe = require('oboe')
const csvParser = require('csv-parser')
const fs = require('fs')

const writer = require('./Writer.js');

var Importer= function () {};

let fileName = ''

Importer.prototype.definitions = function () {

}

Importer.prototype.properties = function () {
    
    const filePath = './source_schema/schemaorg-current-http-properties.csv'

    const fileRoot = path.resolve('./source_schema/properties/')

    let fileName = ''

    fs.createReadStream(filePath)
    .on('error', () => {
        // handle error
    })

    .pipe(csvParser())
    .on('data', (row) => {

        fileName = row.label + '.json'

        row.sourceSchema = row.id

        delete row.id

        if(row.domainIncludes) {
            row.domainIncludes = cleanIncludes(row.domainIncludes)
        }
        
        if(row.rangeIncludes) {
            row.rangeIncludes = cleanIncludes(row.rangeIncludes)
        }

       console.log(row)
    })

    .on('end', () => {
        // handle end of CSV
        console.log('All done')

    })
}

function cleanIncludes(includeArray) {

    const linkedSchema = includeArray.split(', ')

    const out = []

    if(typeof linkedSchema == 'string') {
        // We have a single value
        out.push(linkedSchema)
    } else {
        for (const [schema] of Object.entries(linkedSchema)) {
            out.push(popSchema(schema))
        }
    }

    return out
}

function popSchema(val) {
    const n = val.lastIndexOf('/')
    return val.substring(n + 1)
}

module.exports = exports = new Importer();
