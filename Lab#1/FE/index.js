function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById("employeeForm").addEventListener("submit", (event) => {
  event.preventDefault(); 
  createEmployee();
});

// TODO
// add event listener to delete button
document.getElementById("dataTable").addEventListener("click", deleteEmployee);

// TODO
async function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const employeeData = {id,name};
  try {
    await fetch("http://localhost:3000/api/v1/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData)
    });

    fetchEmployees(); 
  } catch (error) {
    console.error("Error adding employee:", error);
  }
  fetchEmployees();

}

// TODO
async function deleteEmployee(event) {
  try {
    if (!event.target.classList.contains("btn-danger")) return;
    const row = event.target.closest("tr"); //find closes row (current)
    const id = row.cells[0].textContent;

    const response = await fetch(`http://localhost:3000/api/v1/employee/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) {
      throw new Error("error deleting");
    }
    await fetchEmployees(); 
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchEmployees()
