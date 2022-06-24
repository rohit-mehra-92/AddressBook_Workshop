let isUpdate = false;
let contactObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
  
  const name = document.querySelector("#name");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      setTextValue(".name-error", "");
      return;
    }
    try {
      checkName(name.value);
      setTextValue(".name-error", "");
    } catch (error) {
      setTextValue(".name-error", error);
    }
  });
  
  const phoneNumber = document.querySelector("#phoneNumber");
  phoneNumber.addEventListener("input", function () {
    if (phoneNumber.value.length == 0) {
      setTextValue(".tel-error", "");
      return;
    }
    try {
      checkPhoneNumber(phoneNumber.value);
      setTextValue(".tel-error", "");
    } catch (error) {
      setTextValue(".tel-error", error);
    }
  });

    const address = document.querySelector("#address");
    address.addEventListener("input", function () {
      if (address.value.length == 0) {
        setTextValue(".address-error", "");
        return;
      }
      try {
        checkAddress(address.value);
        setTextValue(".address-error", "");
      } catch (error) {
        setTextValue(".address-error", error);
      }
    });
    document.querySelector('#cancleButton').href = site_properties.home_page;
    
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
    let contactData = contactList.find(contact => contact.id == contactObj.id);
    if (!contactData) {
      contactList.push(createContact());
    } else {
      const index = contactList
                    .map(contact => contact.id)
                    .indexOf(contactData.id);
      contactList.splice(index, 1, createContact(contactData.id));
    }
  } else {
    contactList = [createContact()];
  }
  localStorage.setItem("ContactList", JSON.stringify(contactList))
}

  const createContact = (id) => {
    let contact = new Contact();
    if (!id) {
      contact._id = generateId();
    }
    else {
      contact._id = id;
    }
    setContactData(contact);
    return contact;
};

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
  if(!isUpdate) contactObj.id = createNewConatactID();
  
  contactObj._name = getInputValueById("#name");   
  contactObj._phoneNumber = getInputValueById("#phoneNumber");
  contactObj._address = getInputValueById("#address");
  contactObj._city = getInputValueById("#city");
  contactObj._state = getInputValueById("#state"); 
  contactObj._zip = getInputValueById("#zip");
  
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

const checkForUpdate = () => {
  const contactJson = localStorage.getItem('contactEdit');
  isUpdate = contactJson ? true : false;
  if (!isUpdate) {
    return;
  }
  contactObj = JSON.parse(contactJson);
  setForm();
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