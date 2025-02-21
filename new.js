// script.js
const addNoteIcon = document.getElementById('addNoteIcon');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteTitleInput = document.getElementById('noteTitle');
const noteDescriptionInput = document.getElementById('noteDescription');
const noteColorInput = document.getElementById('noteColor');
const notesContainer = document.getElementById('notesContainer');

addNoteIcon.addEventListener('click', () => {
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.classList.add('active'); // Add active class after display is set
    }, 10); // Small delay to allow display change to take effect
});

// Close the popup
closePopup.addEventListener('click', () => {
    popup.classList.remove('active'); // Remove active class first
    setTimeout(() => {
        popup.style.display = 'none'; // Hide popup after transition
    }, 250); // Match the duration of the transition (0.25s)
});

// Add note to the container and store it in local storage
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

        // Store the note in local storage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        // Clear input fields
        noteTitleInput.value = '';
        noteDescriptionInput.value = '';
        noteColorInput.value = '#ffffff';
        
        // Hide the popup
        popup.classList.remove('active'); // Remove active class first
        setTimeout(() => {
            popup.style.display = 'none'; // Hide popup after transition
        }, 250); // Match the duration of the transition (0.25s)

        // Render notes
        renderNotes();
    }
});

// Render notes from local storage
// Render notes from local storage
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
                    <!-- Use Font Awesome icons -->
                    <i class="fas fa-edit" onclick="editNote(${index})"></i>
                    <i class="fas fa-trash" onclick="deleteNote(${index})"></i>
                </div>
            </div>
        `;

        notesContainer.appendChild(noteElement);
    });
}


// Edit note
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];
    
    noteTitleInput.value = note.title;
    noteDescriptionInput.value = note.description;
    noteColorInput.value = note.color;

    // Remove the note first and open the popup
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    popup.style.display = 'flex';
}

// Delete note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));

    // Re-render notes
    renderNotes();
}

// Initialize by rendering existing notes
renderNotes();


