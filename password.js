
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");

menuIcon.addEventListener("click", function (e) {
    // Stop the click event from propagating to document (to prevent closing immediately)
    e.stopPropagation();
    
    // Toggle the sidebar visibility
    if (sidebar.style.left === "0px") {
        // If sidebar is visible, hide it
        sidebar.style.left = "-250px";
    } else {
        // If sidebar is hidden, show it
        sidebar.style.left = "0px";
    }
});

// Hide the sidebar when clicking outside of it
document.addEventListener("click", function (e) {
    // Check if the clicked target is outside the sidebar and menu icon
    if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
        // Hide the sidebar if click is outside
        sidebar.style.left = "-250px";
    }
});