const inputBox = document.querySelector("#input-box");
let listContainer = document.querySelector("#list-container");

function addTask() {
  const taskText = inputBox.value.trim(); // Trim the input text to remove whitespace

  if (taskText === "") {
      alert("Enter a valid task!");
      return; // Don't add an empty task
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Get the current time in milliseconds
  const timestamp = new Date().getTime();

  // Add task if valid
  tasks.push({ text: taskText, timestamp: timestamp });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputBox.value = ""; // Clear the input field
  showTask(); // Refresh the task list
}

function triggerStampHit(taskItem) {
  taskItem.classList.add("stamp-hit");

  // Remove the animation class after it finishes, so it can be re-triggered
  taskItem.addEventListener("animationend", () => {
      taskItem.classList.remove("stamp-hit");
  });
}

function showTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listContainer.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
      if (task.text.trim()) { // Only display non-empty tasks
          let li = document.createElement("li");
          li.classList.add("task-item");

          let taskText = document.createElement("span");
          taskText.innerHTML = task.text;
          li.appendChild(taskText);

          // Get the current time in milliseconds
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - task.timestamp; // in milliseconds

          let timerText = document.createElement("span");
          timerText.classList.add("task-timer");

          // Convert to days
          const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert to days

          // If less than 1 day has passed, show 0d
          if (daysElapsed >= 1) {
              timerText.innerHTML = `${daysElapsed}d`; // Show days
          } else {
              timerText.innerHTML = `0d`; // Show 0d for tasks added recently
          }

          li.appendChild(timerText);

          let editBtn = document.createElement("button");
          editBtn.classList.add("editButton");
          let editIcon = document.createElement("i");
          editIcon.classList.add("fas", "fa-edit");
          editBtn.appendChild(editIcon);
          editBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              editTask(li, taskText, index); 
          });

          let deleteBtn = document.createElement("button");
          deleteBtn.classList.add("deleteButton");
          let deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fas", "fa-trash");
          deleteBtn.appendChild(deleteIcon);

          deleteBtn.addEventListener("click", function () {
              tasks.splice(index, 1);
              localStorage.setItem("tasks", JSON.stringify(tasks));
              showTask(); 
          });

          let buttonContainer = document.createElement("div");
          buttonContainer.classList.add("buttonContainer");
          buttonContainer.appendChild(editBtn);
          buttonContainer.appendChild(deleteBtn);

          li.appendChild(buttonContainer);
          listContainer.appendChild(li);

          // Trigger the stamp-hit animation for the new task
          triggerStampHit(li);

          // Update the task every 24 hours
          setInterval(() => {
              const currentTime = new Date().getTime();
              const timeDiff = currentTime - task.timestamp;
              const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24)); // Update days

              if (daysElapsed >= 1) { // Only show days if at least 1 day has passed
                  timerText.innerHTML = `${daysElapsed}d`; // Show days
              }
          }, 86400000); // 86400000 milliseconds = 24 hours
      }
  });
}



document.addEventListener("DOMContentLoaded", showTask);

function editTask(li, taskText, index) {
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText.innerHTML;
    li.insertBefore(inputField, taskText); 
    taskText.remove();

    inputField.focus();

    inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            taskText.innerHTML = inputField.value;
            li.insertBefore(taskText, inputField);
            inputField.remove();

            const tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks[index].text = inputField.value;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            showTask(); 
        }
    });

    inputField.addEventListener("blur", function () {
        taskText.innerHTML = inputField.value;
        li.insertBefore(taskText, inputField);
        inputField.remove();

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].text = inputField.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        showTask(); 
    });
}




function editTask(li, taskText, index) {
    // Create input field and pre-populate with current text
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText.innerHTML; // Set the current task text as input value
    li.insertBefore(inputField, taskText); // Insert input field before the text

    // Remove the original task text (span)
    taskText.remove();

    // Focus on the input field
    inputField.focus();

    // Listen for Enter key to save the edit
    inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            taskText.innerHTML = inputField.value; // Set the updated text
            li.insertBefore(taskText, inputField); // Re-add the task text after the input field
            inputField.remove(); // Remove the input field

            // Update task in the array and save it to localStorage
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks[index].text = inputField.value;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            showTask(); // Refresh the task list
        }
    });

    // If the user clicks outside the input field, the edit will be discarded
    inputField.addEventListener("blur", function () {
        taskText.innerHTML = inputField.value; // Set the updated text
        li.insertBefore(taskText, inputField); // Re-add the task text after the input field
        inputField.remove(); // Remove the input field

        // Update task in the array and save it to localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[index].text = inputField.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        showTask(); // Refresh the task list
    });
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

listContainer.addEventListener("click", (e) => {
    // If the task text (span) is clicked, toggle the "checked" class (strikethrough effect)
    if (e.target.tagName === "SPAN") {
        // Toggle the "checked" class for the span
        e.target.classList.toggle("checked");

        // Show the SweetAlert when the task is checked
        if (e.target.classList.contains("checked")) {
            // Show SweetAlert when the task is marked as checked
            swal("Great!", "Congrats on finishing! On to the next!", "success");
        }

        if (e.target.classList.contains("checked")) {
            // Trigger confetti effect
            triggerConfetti();
        }

        // Update the task's checked status in the array
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const index = Array.from(listContainer.children).indexOf(e.target.closest("li"));
        tasks[index].checked = e.target.classList.contains("checked");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});




