const insertUpdateBtn = document.getElementById("btnInsertUpdate");
const clearRecordsBtn = document.getElementById("btnClearRecords");
const clearFieldsBtn = document.getElementById("btnClearFields");
const saveBtn = document.getElementById("btnSaveData");
const tableRecords = document.getElementById("tableRecords");
const sortCriteriaDropdown = document.getElementById("sortCriteriaDropdown");
const sortOrderDropdown = document.getElementById("sortOrderDropdown");

let recordsArray = JSON.parse(localStorage.getItem("records")) || [];

const tableHeaderLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

updateTable();

if (recordsArray.length === 0) {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
} else {
    document.getElementById("status").style.display = "none";
}

insertUpdateBtn.addEventListener("click", () => {
    const inputFields = document.getElementsByTagName("input");

    for (const field of inputFields) {
        if (field.value.trim() === "") {
            alert("Please complete all the text inputs!");
            return;
        }
    }

    let record = {
        firstName: inputFields[0].value.trim(),
        middleName: inputFields[1].value.trim(),
        lastName: inputFields[2].value.trim(),
        age: parseInt(inputFields[3].value.trim())
    };

    recordsArray.push(record);

    for (const field of inputFields) {
        field.value = "";
    }

    updateTable();
    saveToLocalStorage();
});

clearFieldsBtn.addEventListener("click", () => {
    const inputFields = document.getElementsByTagName("input");
    for (const field of inputFields) {
        field.value = "";
    }
    insertUpdateBtn.innerHTML = "Insert";
    insertUpdateBtn.value = "insert";
});

clearRecordsBtn.addEventListener("click", () => {
    recordsArray = [];
    localStorage.clear();
    updateTable();
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
    insertUpdateBtn.innerHTML = "Insert";
    insertUpdateBtn.value = "insert";
});

saveBtn.addEventListener("click", () => {
    saveToLocalStorage();
});

sortCriteriaDropdown.addEventListener("change", sortAndDisplayRecords);
sortOrderDropdown.addEventListener("change", sortAndDisplayRecords);

function sortAndDisplayRecords() {
    const sortCriteria = sortCriteriaDropdown.value;
    const sortOrder = sortOrderDropdown.value;

    if (sortCriteria && sortOrder) {
        sortRecords(sortCriteria, sortOrder);
        updateTable(); 
        saveToLocalStorage(); 
    }
}

function sortRecords(criteria, order) {
    recordsArray.sort((a, b) => {
        let valueA = a[criteria] ? String(a[criteria]).toLowerCase() : "";
        let valueB = b[criteria] ? String(b[criteria]).toLowerCase() : "";

        if (order === "asc") {
            return valueA.localeCompare(valueB); 
        } else {
            return valueB.localeCompare(valueA); 
        }
    });
}

function updateTable() {
    tableRecords.innerHTML = ""; 

    if (recordsArray.length === 0) {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
        return;
    } else {
        document.getElementById("status").style.display = "none";
    }

    const tableHeaderRow = document.createElement("tr");
    const tableHeader = document.createElement("thead");
    tableHeaderLabels.forEach(label => {
        const tableHeaderCell = document.createElement("th");
        tableHeaderCell.innerHTML = label;
        tableHeaderRow.appendChild(tableHeaderCell);
    });

    tableHeader.appendChild(tableHeaderRow);
    tableRecords.appendChild(tableHeader);

    const tableBody = document.createElement("tbody");

    recordsArray.forEach((rec, i) => {
        const tableRow = document.createElement("tr");

        ["firstName", "middleName", "lastName"].forEach(key => {
            const cell = document.createElement("td");
            cell.innerHTML = rec[key];
            tableRow.appendChild(cell);
        });

        const ageCell = document.createElement("td");
        ageCell.innerHTML = rec.age;
        tableRow.appendChild(ageCell);

        const actionBtnCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = () => deleteData(i);

        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Edit";
        updateBtn.onclick = () => updateData(i);

        actionBtnCell.appendChild(deleteBtn);
        actionBtnCell.appendChild(updateBtn);
        tableRow.appendChild(actionBtnCell);

        tableBody.appendChild(tableRow);
    });

    tableRecords.appendChild(tableBody);
}

// Delete a Record
function deleteData(index) {
    recordsArray.splice(index, 1);
    updateTable();
    saveToLocalStorage();
}

// Edit a Record
function updateData(index) {
    const inputFields = document.getElementsByTagName("input");

    inputFields[0].value = recordsArray[index].firstName;
    inputFields[1].value = recordsArray[index].middleName;
    inputFields[2].value = recordsArray[index].lastName;
    inputFields[3].value = recordsArray[index].age;

    insertUpdateBtn.innerHTML = "Update";
    insertUpdateBtn.value = `${index}`;
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem("records", JSON.stringify(recordsArray));
}