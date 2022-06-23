class Contact {
  
     get name() {
      return this._name;
    }
    set name(name) {
      let nameRegex = RegExp("^[A-Z]{1}[A-Za-z\\s]{2,}$");
      if (nameRegex.test(name)) {
        this._name = name;
      } else {
        throw "Invalid Name!";
      }
    }
  
    get address() {
      return this._address;
    }
    set address(address) {
      let addressRegex = RegExp("^[a-zA-Z0-9\\s]{3,}$");
      if (addressRegex.test(address)) {
          this._address = address;
        } else {
          throw "Invalid Address!";
        }   
      }
    
    get city() {
      return this._city;
    }
    set city(city) {
      this._city = city;
    }
    
    get state() {
      return this._state;
    }
    set state(state) {
        this._state = state;
    }
  
    get zip() {
      return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
      
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) {
    let phoneNumberRegex = RegExp("^(0|[+]|[90]|[91])?[7-9][0-9]{9}");
    if (phoneNumberRegex.test(phoneNumber)) {
        this._phoneNumber = phoneNumber;
    } else {
        throw "Invalid Phone Number!";
    }   
    }
    toString(){
      return `Name: ${this.name} \nPhone Number: ${this.phoneNumber} \nAddress: ${this.address} \nCity: ${this.city} \nState: ${this.state} \nZip:  ${this.zip}`;
  }
};
    