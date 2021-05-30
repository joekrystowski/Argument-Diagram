const [NUMBER, STRING, BOOLEAN, ARRAY, OBJECT] = ["number", "string", "boolean", "array", "object"];

function assertType(arguments_, types){
    //needs at least 2 arguments
    if(arguments.length < 2) {
        throw new Error(`Expected at least 2 arguments, got ${arguments.length}`);
    }
    //if we have exactly 2, wrap ones that aren't in arrays into arrays
    else if (arguments.length === 2) {
        //if it is not a normal array and its not arguments array
        if(!Array.isArray(arguments_) && !arguments_.callee) arguments_ = [arguments_];
        if(!Array.isArray(types))      types = [types];
    }
    //if we have more than 2, the extras should belong to the type
    else if(arguments.length > 2) {
        types = [].slice.call(arguments, 1);
    }
    
    //incorrect amount of types
    if(arguments_.length != types.length) {
        throw new Error(`Expected ${arguments_.length} types, got ${types.length}.`);
    }

    //check types of all arguments
    [].forEach.call(arguments_, (element, index) => {
        console.log(element, types[index]);

        if(typeof types[index] !== "string" && typeof types[index] !== "object"){
            throw new TypeError ("Given type must either be string describing the typename or an object detailing the format of the object. (ex: {x: number, y: string, z: array} )");
        }

        //special handling for array
        if(types[index].toString().toLowerCase() === "array" && Array.isArray(element)) {
            return;
        }

        //special handling for object
        if(typeof types[index] === "object"){
            if(typeof element !== "object"){
                throw new TypeError(`ASSERT ${arguments.callee.caller ? `in ${arguments.callee.caller.name}` : 'window'} => Expected ${types[index]} for argument ${index}, instead got ${element} (${Array.isArray(element) ? "array" : typeof element})`);
            }

            const [matches, error_message] = matchesFormat(element, types[index], index);
            if(matches){
                return;
            }
            throw new TypeError(error_message);
        }
        
        if(typeof element !== types[index].toLowerCase()){
            throw new TypeError(`ASSERT in ${arguments.callee.caller ? `in ${arguments.callee.caller.name}` : 'window'} => Expected ${types[index]} for argument ${index}, instead got ${element} (${typeof element})`);
        }
    });
}

function matchesFormat(arg_object, format_object, arg_num){
    for(let format_prop in format_object) {
        if(!arg_object.hasOwnProperty(format_prop)){
            return [false, `Missing property '${format_prop}' on argument number ${arg_num}`];
        }

        //special handling for array
        if(format_object[format_prop].toString().toLowerCase() === "array" && Array.isArray(arg_object[format_prop])) {
            continue;
        }

        if(typeof format_object[format_prop] === "object" ){
            if(typeof arg_object[format_prop] !== "object" || Array.isArray(arg_object[format_prop])){
                return [false, `Expected type object for parameter '${format_prop}' in argument ${arg_num}, got ${arg_object[format_prop]} (${Array.isArray(arg_object[format_prop]) ? "array" : typeof arg_object})}`];
            }
            let [matches, error_message] = matchesFormat(arg_object[format_prop], format_object[format_prop], arg_num);
            if(matches) continue;
            return [false, error_message];
        }

        //if the type of the property doesn't match the specification given in the format object
        if(typeof arg_object[format_prop] !== format_object[format_prop]) {
            return [false, `Expected ${format_object[format_prop]} for type of property '${format_prop}' in argument ${arg_num}, instead got ${arg_object[format_prop]} (${typeof arg_object[format_prop]})`];
        }
    }
    return [true, ''];
}