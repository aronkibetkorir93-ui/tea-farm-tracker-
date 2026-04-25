let records = JSON.parse(localStorage.getItem("records")) || [];

const PRICE = 7;

// Add record
function addRecord() {
  let farmer = document.getElementById("farmer").value;
  let kg = Number(document.getElementById("kg").value);

  if (!farmer || !kg) {
    alert("Fill all fields");
    return;
  }

  records.push({
    farmer,
    kg,
    date: new Date().toLocaleDateString()
  });

  localStorage.setItem("records", JSON.stringify(records));

  document.getElementById("farmer").value = "";
  document.getElementById("kg").value = "";

  render(records);
}

// Show records
function render(data) {
  let table = document.getElementById("records");
  let summaryTable = document.getElementById("summary");

  table.innerHTML = "";
  summaryTable.innerHTML = "";

  let summary = {};

  data.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.date}</td>
        <td>${r.farmer}</td>
        <td>${r.kg}</td>
      </tr>
    `;

    summary[r.farmer] = (summary[r.farmer] || 0) + r.kg;
  });

  for (let f in summary) {
    let total = summary[f];
    let pay = total * PRICE;

    summaryTable.innerHTML += `
      <tr>
        <td>${f}</td>
        <td>${total}</td>
        <td>KES ${pay}</td>
      </tr>
    `;
  }
}

// Search function
function searchData() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = records.filter(r =>
    r.farmer.toLowerCase().includes(value)
  );

  render(filtered);
}

// Initial load
render(records);
