const symbols = /[^\w\s\']|_/g;

const validation = (event) => {
    console.log("Enter validation");
    console.log(event.target.name);

    if (event.target.name !== "emailAddress" && event.target.name != "expiryDate") {
        event.target.value = event.target.value.replace(symbols,"").replace(/\s+/g, " ");
    }
    
    switch(event.target.name) {
        case "phoneNumber":
            if (event.target.name === "phoneNumber" && event.target.value.length > 11) {
                const message = "Phone number too long";
                return {valid: false, msg: message};
            }
        case "creditCardNumber":
            if (event.target.name === "creditCardNumber" && event.target.value.length > 16) {
                const message = "Invalid credit card number";
                return {valid: false, msg: message};
            } 
                   
        case "expiryDate":

            var currentDate = new Date();
            var date = new Date(event.target.value);

            // start checking only if receive 4 inputs for year
            if (date.getFullYear().toString().length === 4) {
                if (event.target.name === "expiryDate" && date.getTime() <= currentDate.getTime()) {
                    const message = "Please input a valid date!";
                    console.log(message);
                    return {valid: false, msg: message};
                }
            }
        
        case "cvc":
            if (event.target.name === "cvc" && event.target.value.length > 3) {
                const message = "CVC too long";
                return {valid: false, msg: message};
            }     
        case "streetNumber":
            if (event.target.name === "streetNumber" && event.target.value.length > 6) {
                const message = "Street number too long";
                return {valid: false, msg: message};
            }   
        case "postalCode":
            if (event.target.name === "postalCode" && event.target.value.length > 6) {
                const message = "Postal code too long";
                return {valid: false, msg: message};
            }        
        default:
            // check for number types only
            const currentNum = +(event.target.value);
            if (typeof(currentNum) == 'number' && currentNum < 0) {
                    const message = "Please input a valid number";
                    return {valid: false, msg: message};
            }
            else {
                const message = "All values are valid";
                return {valid: true, msg: message};
            }
    }
}

export {validation};