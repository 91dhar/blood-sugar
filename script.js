document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sugarForm');
    const table = document.getElementById('sugarTable').getElementsByTagName('tbody')[0];

    // Load existing entries from localStorage
    const entries = JSON.parse(localStorage.getItem('sugarEntries')) || [];
    entries.forEach(entry => addEntryToTable(entry));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('date').value;
        const fasting = parseFloat(document.getElementById('fasting').value);
        const pp = parseFloat(document.getElementById('pp').value);

        const entry = { date, fasting, pp };
        entries.push(entry);
        localStorage.setItem('sugarEntries', JSON.stringify(entries));

        addEntryToTable(entry);
        form.reset();
    });

    function addEntryToTable(entry) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.fasting}</td>
            <td>${entry.pp}</td>
        `;

        // Apply conditional styling
        if (entry.fasting < 70 || entry.fasting > 100) {
            row.cells[1].style.backgroundColor = 'red';
            row.cells[1].style.color = 'white';
        }
        if (entry.pp > 140) {
            row.cells[2].style.backgroundColor = 'red';
            row.cells[2].style.color = 'white';
        }
    }
});