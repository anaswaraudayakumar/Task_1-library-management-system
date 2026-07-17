function validator(req, schema) {
  for (const key in req.body) {
    if (schema[key] === "string") {
      const error =stringValidator(key,req.body[key]);
      if(error) return error
    }
    if (schema[key] === "number") {
      const error = numberValidator(key,req.body[key]);
      if(error) return error
    }

  }
  return null
}

function stringValidator(key,value) {
  if (typeof value !== "string") {
    return `${key} must be a string`;
  } else {
    if (value.trim() === "") {
      return `${key} must have a value`;
    }
  }
  return null
}

function numberValidator(key,value){
    if(typeof value !=="number"){
        return `${key} must have a value`;
    }
    return null
}

module.exports =validator