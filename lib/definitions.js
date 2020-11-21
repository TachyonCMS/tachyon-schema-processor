'use strict'
const path = require('path')

const typeHelper = require('./helpers/contentType.js')
const entryHelper = require('./helpers/entry.js')

const Definitions = function () {};

Definitions.prototype.contentType = async function (data) {

    // Root dir for all files for this contentType
    const root = path.join('contentTypes', data.sys.id)

    // The sys data and filename
    const out = typeHelper.sys(root, data)

    // The fields data and filename
    const fields = typeHelper.fields(root, data.fields)

    Object.assign(out, fields)

    return out
}

Definitions.prototype.entry = async function (data) {

    if(data.sys && data.sys.id && data.sys.contentType && data.sys.contentType.sys && data.sys.contentType.sys.id) {
        const entryId = data.sys.id

        const contentType = data.sys.contentType.sys.id

        // Root dir for all files for this contentType
        const root = path.join('entries', entryId)

        // The sys data and filename
        const out = entryHelper.sys(root, data, contentType)

        // The fields data and filename
        const fields = entryHelper.fields(entryId, data.fields)

        Object.assign(out, fields)

        return out

    } else {
        return {}
    }

    
}

Definitions.prototype.tag = function (tag) {
    console.log(tag)
}

Definitions.prototype.asset = function (asset) {
    console.log(asset)
}

Definitions.prototype.locale = function (locale) {
    console.log(locale)
}

module.exports = exports = new Definitions();

