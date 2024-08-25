const [addForm, viewForm] = document.forms;
const tbody = document.querySelector('tbody');
const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional']

addForm.onsubmit = handleAdd;
viewForm.oninput = viewForm.onchange = handleView;

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
// map - це стандартний наслідуваний метод масиву
// що приймає колбек функцію , яку викликає стільки
// разів , скільки елементів в масиві, передаючи в неї
// кожен раз черговий елемент масиву , його індекс
// і весь масив, отримує значення повернуте функцією,
// збирає ці значення в новий масив і повертає його.