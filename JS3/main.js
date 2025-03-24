const loadButton = document.getElementById("loadDataButton");
const clearButton = document.getElementById("clearTableButton");
const dataTable = document.getElementById("dataTable");
const apiInfo = document.getElementById("apiInfo");

loadButton.addEventListener("click", async () => {
    const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
    apiInfo.style.display = "block";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        displayData(fetchedData);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

clearButton.addEventListener("click", () => {
    dataTable.innerHTML = ""; 
});

function displayData(data) {
    dataTable.innerHTML = ""; 

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    const headers = ["User ID", "Task ID", "Title", "Status"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        th.style.border = "1px solid #dddddd";
        th.style.padding = "8px";
        th.style.textAlign = "center";
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    data.forEach(item => {
        const row = document.createElement("tr");
        for (const key in item) {
            const cell = document.createElement("td");
            
            if (key === 'completed') {
                cell.textContent = item[key] ? "Completed" : "Not Yet Completed";
                cell.style.color = item[key] ? "green" : "red"; 
            } else {
                cell.textContent = item[key];
            }
    
            cell.style.border = "1px solid #dddddd";
            cell.style.padding = "8px";
            cell.style.textAlign = "left"; 
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    dataTable.appendChild(table);
}