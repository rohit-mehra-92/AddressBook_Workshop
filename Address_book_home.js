let contactList;

window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getContactFromStorage();
  }
  else {
    getContactFromServer();
  }

});

const processContactDataResponse = () => {
  document.querySelector(".contact-count").textContent = contactList.length;
  createInnerHtml();
  localStorage.removeItem('contactEdit');
};

const getContactFromStorage = () => {
  contactList = localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
  processContactDataResponse();
};

const getContactFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
        contactList = JSON.parse(responseText);
        processContactDataResponse();
      })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      contactList = [];
      processContactDataResponse();
    })
};
  
  const createInnerHtml = () => {
    if (contactList.length == 0) {
      return;
    }
    const headerHtml = `<tr>
      <th>Full Name</th>
      <th>Address</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
      <th>Phone Number</th>
      </tr>`;
    let innerHtml = `${headerHtml}`;
    for (let contact of contactList) {
      innerHtml = `${innerHtml} 
          <tr>
          <td>${contact._name}</td>
          <td>${contact._address}</td>
          <td>${contact._city}</td>
          <td>${contact._state}</td>
          <td>${contact._zip}</td>
          <td>${contact._phoneNumber}</td>
          <td>
              <img src="delete.svg" alt="delete" id="${contact._id}" onclick="remove(this)">
              <img src="edit.svg" alt="update" id="${contact._id}" onclick="update(this)">
          </td>
          </tr>`;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
  };  
  
  const remove = (node) => {
    let removeContact = contactList.find(contact => contact._id == node._id);
    if (!removeContact) {
      return;
    }
    const index = contactList.map(contact => contact._id).indexOf(removeContact._id);
    contactList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(contactList));
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
    window.location.replace("Address_book_home.html");
  }

  const update = (node) => {
    let contactToEdit = contactList.find(Contact => Contact._id == node._id);
    if (!contactToEdit) {
      return;
    }
    localStorage.setItem('contactEdit', JSON.stringify(contactToEdit));
    window.location.replace(site_properties.add_contacts_page);
  }