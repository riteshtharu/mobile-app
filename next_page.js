const profileImg = document.querySelector("#profileImg");
const coverImg = document.querySelector("#cover-img");
const inputImageCover = document.querySelector("#inputImageCover");
const inputImage = document.querySelector("#inputImage"); // Cover photo input element
const userNameElement = document.querySelector(".user-info h2");
const userStatusElement = document.querySelector(".user-info p");
const editForm = document.querySelector("#editForm");
const nameInput = document.querySelector("#name");
const statusInput = document.querySelector("#status");

// Function to update image and store it in localStorage
function updateImage(input, imgElement, storageKey) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            imgElement.src = reader.result; // Update the image source
            localStorage.setItem(storageKey, reader.result); // Save to localStorage
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
    }
}

// Click to upload the image for profile photo
profileImg.addEventListener("click", () => {
    window.open('index8.html?imageType=profile', '_blank');
});



// Click to upload the image for cover photo
coverImg.addEventListener("click", () => {
    window.open('index9.html?imageType=cover', '_blank');
});


// Save profile image to localStorage
inputImageCover.addEventListener("change", () => {
    updateImage(inputImageCover, profileImg, "profileImage"); // Update the profile image
});

// Save cover image to localStorage
inputImage.addEventListener("change", () => {
    updateImage(inputImage, coverImg, "coverImage"); // Update the cover image
});

// Handle the form submission for updating the name and status
editForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const newName = nameInput.value.trim();
    const newStatus = statusInput.value.trim();

    if (newName && newStatus) {
        // Update the user info section with the new values
        userNameElement.textContent = newName;
        userStatusElement.textContent = newStatus;

        // Store the new name and status in localStorage to persist across page reloads
        localStorage.setItem("userName", newName);
        localStorage.setItem("userStatus", newStatus);

        // Update both profile names in main.html (via localStorage)
        localStorage.setItem("profileName", newName);
        localStorage.setItem("profileStatus", newStatus);

        // Save updated profile image for both sidebar and profile
        localStorage.setItem("profileImage", profileImg.src); // Save the profile image
    }
    nameInput.value = "";  // Clear the name input field
    statusInput.value = "";  // Clear the status input field
});



// Load saved name, status, cover image, and profile image from localStorage (if available)
window.addEventListener("load", () => {
    const savedProfileImage = localStorage.getItem("profileImage");
    const savedCoverImage = localStorage.getItem("coverImage");
    const savedName = localStorage.getItem("userName");
    const savedStatus = localStorage.getItem("userStatus");

    if (savedProfileImage) {
        profileImg.src = savedProfileImage; // Update the profile image
    }

    if (savedCoverImage) {
        coverImg.src = savedCoverImage; // Update the cover image
    }

    if (savedName) {
        userNameElement.textContent = savedName;
        nameInput.value = savedName;
    }

    if (savedStatus) {
        userStatusElement.textContent = savedStatus;
        statusInput.value = savedStatus;
    }
});
