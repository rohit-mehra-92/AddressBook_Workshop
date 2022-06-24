const checkName = (name) => {
    let nameRegex = RegExp("^[A-Z]{1}[A-Za-z\\s]{2,}$");
    if (!nameRegex.test(name)) {
        throw "NAME is Invalid"; 
    }
};

const checkPhoneNumber = (phoneNumber) => {
    let phoneNumberRegex = RegExp("^(0|[+]|[90]|[91])?[7-9][0-9]{9}");
    if (!phoneNumberRegex.test(phoneNumber)) {
        throw "PHONE NUMBER is Invalid"; 
    }
};

const checkAddress = (address) => {
    let addressRegex = RegExp("^[a-zA-Z0-9\\s]{3,}$");
    if (!addressRegex.test(address)) {
        throw "PHONE NUMBER is Invalid"; 
    }
};

