const form = document.getElementById("leadForm");
const table = document.getElementById("leadTable");

let leads = JSON.parse(localStorage.getItem("leads")) || [];

function displayLeads() {
    table.innerHTML = "";
    leads.forEach((lead, index) => {
        table.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option ${lead.status === "New" ? "selected" : ""}>New</option>
                    <option ${lead.status === "Contacted" ? "selected" : ""}>Contacted</option>
                    <option ${lead.status === "Converted" ? "selected" : ""}>Converted</option>
                </select>
            </td>
        </tr>`;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const lead = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        status: document.getElementById("status").value
    };

    leads.push(lead);
    localStorage.setItem("leads", JSON.stringify(leads));
    displayLeads();
    form.reset();
});

function updateStatus(index, newStatus) {
    leads[index].status = newStatus;
    localStorage.setItem("leads", JSON.stringify(leads));
}

displayLeads();