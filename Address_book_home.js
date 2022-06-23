window.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
  });
  
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
  
  let contactList = [
    {
      _id: 1,
      _name: "Rohit mehra",
      _phoneNumber: "7415257009",
      _address: "Vijay Nagar",
      _city: "Indore",
      _state: "Madhya pradesh",
      _zip: "452020",
    },
    {
      _id: 2,
      _name: "Karan mehra",
      _phoneNumber: "8319425481",
      _address: "Indira Nagar",
      _city: "Rewa",
      _state: "Madhya pradesh",
      _zip: "486001",
    },
  ];