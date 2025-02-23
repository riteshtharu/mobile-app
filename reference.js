let editingIndex = -1;  // Variable to track the task being edited

window.onload = function () {
  loadTask();
  let addButton = document.querySelector(".btn-class-name");
  addButton.addEventListener("click", () => {
    let inputField = document.querySelector("input");
    let taskText = inputField.value.trim();
    if (editingIndex === -1) {
      addTask(taskText);  // Add task if not editing
    } else {
      saveEditedTask(taskText);  // Save edited task
    }
  });
};


function loadTask() {
  let tasks = getTaskFromStorage();
  console.log("Loaded tasks:", tasks);  // Check if tasks are being loaded correctly
  let ul = document.querySelector(".taskList");
  ul.textContent = "";  // Clear the list before adding new tasks
  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // Create a span to hold the task text
    let taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.checked) {
      taskText.classList.add("checked");
    }

    // Add click event to toggle checked
    taskText.addEventListener("click", () => {
      toggleChecked(index);  
    });

    // Create the task-time span
    let timeText = document.createElement("span");
    timeText.classList.add("task-time");

    // Calculate the time difference and display it
    let createdTime = new Date(task.createdAt);
    let timeDiff = Math.floor((Date.now() - createdTime) / (1000 * 60 * 60 * 24)); // Get difference in days
    timeText.textContent = `${timeDiff}d`;  // Display time in days

    // Create the edit button
    let editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    let editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");
    editButton.appendChild(editIcon);

    // Add event listener for the edit button
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();  
      editTask(index, task.text); 
    });

    // Create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash");
    deleteButton.appendChild(deleteIcon);

    // Add event listener for the delete button
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();  
      deleteTask(index);
    });

    // Create a container for the buttons
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    // Append the task time, then the buttons (edit and delete)
    li.appendChild(taskText);
    li.appendChild(timeText);  // Add task time before the buttons
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Append the button container to the li
    li.appendChild(buttonContainer);

    // Finally, append the li to the ul
    ul.appendChild(li);
  });
}



function editTask(index, currentText) {
  // Set the input field value to the task's current text
  let inputField = document.querySelector("input");
  inputField.value = currentText;

  // Set the editingIndex to the index of the task being edited
  editingIndex = index;
}

function saveEditedTask(taskText) {
  if (taskText.trim() === "") {
    alert("Please enter a valid task.");
    return;
  }

  let tasks = getTaskFromStorage();
  tasks[editingIndex].text = taskText;  // Update the task's text

  saveTasksToStorage(tasks);  // Save updated tasks to localStorage
  loadTask();  // Reload tasks

  // Reset input field and editing state
  editingIndex = -1;  // Reset the editing index
  document.querySelector("input").value = "";  // Clear the input field
}



function addTask(taskText) {
  let alertMssg = document.querySelector(".alertMssg");
  let inputField = document.querySelector("input");
  let cleanData = taskText.trim();

  if (cleanData === "") {
    alertMssg.innerHTML = "Enter The Task First!";
    return;
  }

  let tasks = getTaskFromStorage();
  tasks.push({ text: cleanData, checked: false, createdAt: new Date().getTime() });  // Store the time when the task is created
  inputField.value = "";
  alertMssg.innerHTML = "";
  saveTasksToStorage(tasks);
  loadTask();
}


function getTaskFromStorage() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  let tasks = getTaskFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  loadTask();
}

function triggerConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        zIndex: 10000, // Ensure confetti is on top of SweetAlert
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function toggleChecked(index) {
  let tasks = getTaskFromStorage();
  tasks[index].checked = !tasks[index].checked;  // Toggle checked state
  saveTasksToStorage(tasks);

  // If the task is checked, trigger the confetti effect first, then show SweetAlert
  if (tasks[index].checked) {
    triggerConfetti();  // Trigger confetti when task is checked

    // Display SweetAlert with a success message
    swal("Great!", "You've finished your work!", "success");
  }

  loadTask();
}





// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  console.error('SpeechRecognition is not supported in this browser.');
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US'; // Set the language for speech recognition
  recognition.interimResults = true;

  const microphoneIcon = document.querySelector('.input-icon i');
  
  // Function to start speech recognition
  const startRecognition = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
              recognition.start();
              microphoneIcon.style.color = '#00683C'; // Change icon color when listening
              console.log('Microphone permission granted. Listening...');
          })
          .catch((error) => {
              alert('Microphone access denied. Please allow microphone access.');
              console.error('Microphone access denied:', error);
          });
  };

  microphoneIcon.addEventListener('click', startRecognition); // Start on desktop click
  microphoneIcon.addEventListener('touchstart', startRecognition); // Start on mobile touchstart
  microphoneIcon.addEventListener('touchend', startRecognition); // Start on mobile touchend (if necessary)

  // Handle speech recognition result
  recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript;
      
      // Only proceed if the result is final
      if (event.results[0].isFinal) {
          addTask(transcript);  // Add the task to the list
      }
  });

  // Handle errors in speech recognition
  recognition.addEventListener('error', (event) => {
      console.error('Speech recognition error:', event.error);
  });
}


 