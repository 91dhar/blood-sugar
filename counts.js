document.addEventListener('DOMContentLoaded', function() {
    const entries = JSON.parse(localStorage.getItem('sugarEntries')) || [];
    const table = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    
    // Sort entries by date, most recent first
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    entries.forEach(entry => {
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
    });
});