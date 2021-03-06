

function isString (obj) {
  return 'string' === typeof obj
}

function isNumber (obj) {
  return 'number' === typeof obj && !isNaN(obj)
}

function isObject (obj) {
  return obj && 'object' === typeof obj
}

function isArray (obj) {
  return Array.isArray(obj)
}

function isPrimitive(obj) {
  return isString(obj) || isNumber(obj)
}

function isText (obj) {
  return isString() && /\s/.test(obj)
}

module.exports = pairs

function pairs (obj) {
  var all = {}
  function add (k, v, array) {
    all[JSON.stringify(array ? [k, true, v] : [k, v])] = true
  }

  ;(function _pairs (obj, p) {
    for(var k in obj) {
        if(p != null && !isArray(obj))
          add(p, k)

        if(isObject(obj[k])) {
          _pairs(obj[k], isArray(obj) ? p : k, isArray(obj))
        } else if(p != null)
          add(isArray(obj) ? p : k, obj[k], isArray(obj))
        else if(isPrimitive(obj[k]))
          add(k, obj[k])
    }
  })(obj)

  return Object.keys(all).sort().map(JSON.parse)
}

