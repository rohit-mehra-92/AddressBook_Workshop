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
        resetForm();
        window.location.replace(site_properties.home_page);
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

const createContact = (id) => {
  let contact = new Contact();
  setContactData(contact);
  return contact;
}

const setContactData = (contact) => {

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
    contact.address = getInputValueById("#address");
  } catch (error) {
    setTextValue(".address-error", error);
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

  try {
    contact.zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error;
  }

  console.log(contact.toString());
  return contact;
};

const setContactObject = () => {
  try {
    contactObj._name = getInputValueById("#name");
  } catch (error) {
    setTextValue(".name-error", error);
    throw error;
  }

  try {
    contactObj._phoneNumber = getInputValueById("#phoneNumber");
  } catch (error) {
    setTextValue(".tel-error", error);
    throw error;
  }

  contactObj._address = getInputValueById("#address");
  contactObj._city = getInputValueById("#city");
  contactObj._state = getInputValueById("#state");

  try {
    contactObj._zip = getInputValueById("#zip");
  } catch (error) {
    setTextValue(".zip-error", error);
    throw error;
  }
};

const setForm = () => {
  setValue("#name",contactObj._name);
  setValue("#phoneNumber", contactObj._phoneNumber);
  setValue("#address", contactObj._address);
  setValue("#city", contactObj._city);
  setValue("#state", contactObj._state);
  setValue("#zip", contactObj._zip);
}

const generateId = () => {
  let contactId = localStorage.getItem("ContactID");
  contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
  localStorage.setItem("ContactID", contactId);
  return contactId;
};

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