const [addForm, viewForm] = document.forms;
const tbody = document.querySelector('tbody');
const levels = [, 'Beginner', 'Intermediate', 'Advanced', 'Professional']

addForm.onsubmit = handleAdd;
viewForm.oninput = viewForm.onchange = handleView;

addStudent({ name: 'John Doe', telegram: '@johndoe', level: '2' });
addStudent({ name: 'Alph', phone: '123', level: '4' });
addStudent({ name: 'beta', telegram: '@beta', level: '1' });
addStudent({ name: 'John Doeson', telegram: '@johndoeson', level: '3' });

function handleAdd(e) {
    e.preventDefault();

    const student = Object.fromEntries(new FormData(addForm));

    addStudent(student);
    addForm.reset();
}

function handleView() {
    showAll();
    applySearch(viewForm.search.value);
    applyFilter(viewForm.filter.value);
}

function showAll() {
    for (const row of tbody.rows) {
        row.hidden = false;
    }
}

function applySearch(query) {
    for (const row of tbody.rows) {
        row.hidden ||= !row.cells[0].innerText.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            && !row.cells[1].innerText.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            && !row.cells[2].innerText.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    }
}

function applyFilter(filter) {
    for (const row of tbody.rows) {
        row.hidden ||= filter && (
            filter == 'tg' && !row.cells[1].innerText
            || filter == 'no-tg' && row.cells[1].innerText
            || filter == 'phone' && !row.cells[2].innerText
            || filter == 'no-phone' && row.cells[2].innerText
            || !isNaN(filter) && filter != levels.indexOf(row.cells[3].innerText)
        )
    }
}

function addStudent(student) {
    const row = tbody.insertRow();

    row.insertCell().append(student.name)
    row.insertCell().append(student.telegram || '')
    row.insertCell().append(student.phone || '')
    row.insertCell().append(levels[student.level])
}