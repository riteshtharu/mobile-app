const addNoteIcon = document.getElementById('addNoteIcon');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteTitleInput = document.getElementById('noteTitle');
const noteDescriptionInput = document.getElementById('noteDescription');
const noteColorInput = document.getElementById('noteColor');
const notesContainer = document.getElementById('notesContainer');

let editingIndex = null; // Track which note is being edited

// Open the popup for adding a new note
addNoteIcon.addEventListener('click', () => {
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
});

// Close the popup
closePopup.addEventListener('click', () => {
    popup.classList.remove('active');
    setTimeout(() => {
        popup.style.display = 'none';
    }, 250);
    resetForm(); // Reset the form when closing the popup
});

// Add or save note (handles both adding a new note and editing an existing one)
addNoteBtn.addEventListener('click', () => {
    const title = noteTitleInput.value.trim();
    const description = noteDescriptionInput.value.trim();
    const color = noteColorInput.value;

    if (title && description) {
        const note = {
            title,
            description,
            color,
            date: new Date().toLocaleString()
        };

        // Get existing notes or initialize an empty array
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (editingIndex !== null) {
            // If editing, update the note at the `editingIndex`
            notes[editingIndex] = note;
            editingIndex = null; // Reset editingIndex after saving changes
            addNoteBtn.innerText = 'Add Note'; // Reset button text
        } else {
            // If not editing, add a new note
            notes.push(note);
        }

        // Save the notes back to localStorage
        localStorage.setItem('notes', JSON.stringify(notes));

        // Clear the input fields after adding or updating the note
        resetForm();

        // Close the popup after the action
        popup.classList.remove('active');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 250);

        // Re-render the notes
        renderNotes();
    }
});

// Edit note
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    // Pre-populate the form with the note data
    noteTitleInput.value = note.title;
    noteDescriptionInput.value = note.description;
    noteColorInput.value = note.color;

    // Open the popup for editing
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);

    // Store the index of the note being edited
    editingIndex = index;

    // Change the button text to "Save Changes"
    addNoteBtn.innerText = 'Save Changes';
}

// Delete note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove the note at the specified index
    localStorage.setItem('notes', JSON.stringify(notes));

    // Re-render notes
    renderNotes();
}

// Render notes from localStorage
function renderNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;

        noteElement.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.description}</p>
            <div class="note-footer">
                <span class="note-date">${note.date}</span>
                <div class="note-actions">
                    <i class="fas fa-edit" onclick="editNote(${index})"></i>
                    <i class="fas fa-trash" onclick="deleteNote(${index})"></i>
                </div>
            </div>
        `;

        notesContainer.appendChild(noteElement);
    });
}

// Reset the form fields
function resetForm() {
    noteTitleInput.value = '';
    noteDescriptionInput.value = '';
    noteColorInput.value = '#ffffff';
    editingIndex = null; // Reset editingIndex
    addNoteBtn.innerText = 'Add Note'; // Reset button text
}

// Initialize by rendering existing notes
renderNotes();