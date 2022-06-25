let isUpdate = false;
let contactObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
  
  const name = document.querySelector("#name");
  const nameError = document.querySelector('.name-error')
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      new Contact().name = name.value;
      nameError.textContent = "";
    } catch (error) {
      nameError.textContent = error;
    }
  });

  const phoneNumber = document.querySelector("#phoneNumber");
  const telError = document.querySelector('.tel-error')
  phoneNumber.addEventListener("input", function () {
    if (phoneNumber.value.length == 0) {
     telError.textContent = "";
     return;
    }
    try {
      new Contact().phoneNumber = phoneNumber.value;
      telError.textContent = "";
    } catch (error) {
      telError.textContent = error;
  }
  });

  const address = document.querySelector("#address");
  const addError = document.querySelector('.address-error')
  address.addEventListener("input", function () {
    if (address.value.length == 0) {
      addError.textContent = " ";
      return;
    }
    try {
      new Contact().address = address.value;
      addError.textContent = " ";
    } catch (error) {
      addError.textContent = error;
    }
  });

  const zip = document.querySelector("#zip");
  const zipError = document.querySelector('.zip-error')
  zip.addEventListener("input", function () {
    if (zip.value.length == 0) {
      zipError.textContent = "";
      return;
    }
    try {
      new Contact().zip = zip.value;
      zipError.textContent = "";
  } catch (error) {
      zipError.textContent = error;
  }
  });
  checkForUpdate();

});
 
const save = () => {
    try{
        let contact =  createContact();
        createAndUpdateStorage(contact);
    }catch(error){
      alert (error);
    }
}

const createAndUpdateStorage = (contact) => {
  let contactList = JSON.parse(localStorage.getItem("ContactList"));
  if (contactList != undefined) {
    contactList.push(contact);
  } else {
    contactList = [contact];
  }
  alert(contact.toString());
  alert("Contact Added Sucessfully");
  localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const createContact = () => {
  let contact = new Contact();
  try {
      contact.name = getInputValueById("#name");
    } catch (error) {
      setTextValue(".name-error", error);
      throw error;
    }

  try {
      contact.phoneNumber = getInputValueById("#phoneNumber");
      } catch (error) {
      setTextValue(".tel-error", error);
      throw error;
  }

  try {
      console.log(document.querySelector('#address').value);
      contact.address = getInputValueById("#address");
      } catch (error) {
      setTextValue(".address-error", error);
      throw error;
  }

  try {
      contact.zip = getInputValueById("#zip");
      } catch (error) {
      setTextValue(".zip-error", error);
      throw error;
  }
  
  let city = getInputValueById("#city");
      if (city != "Select City") {
      contact.city = city;
      } else {
      throw "Please select city";
  }

  let state = getInputValueById("#state");
      if (state != "Select State") {
      contact.state = state;
      } else {
      throw "Please select state";
  }
    return contact;
}

const setForm = () => {
  setValue("#name",contactObj._name);
  setValue("#phoneNumber", contactObj._phoneNumber);
  setValue("#address", contactObj._address);
  setValue("#city", contactObj._city);
  setValue("#state", contactObj._state);
  setValue("#zip", contactObj._zip);
}

const resetForm = () => {
  setValue("#name", "");
  setValue("#phoneNumber", "");
  setValue("#address", "");
  setSelectedIndex('#city', 0);
  setSelectedIndex('#state', 0);
  setValue("#zip", "");
  setTextValue(".name-error", "");
  setTextValue(".tel-error", "");
  setTextValue(".address-error", "");
};


const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
};

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
};

const getInputValueById = (property) => {
  let value = document.querySelector(property).value;
  return value;
};

const checkForUpdate = () => {
  const contactJson = localStorage.getItem('editContact');
  isUpdate = contactJson ? true : false;
  if(!isUpdate){
    return;
  }
  contactObj = JSON.parse(contactJson);
  setForm();
}