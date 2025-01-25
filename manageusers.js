import { database } from '/firebaseConfig.js';  // Import the shared database instance
import { ref, get, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


function fetchUsers() {
  const usersRef = ref(database, 'users');
  get(usersRef)
    .then((snapshot) => {
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; // Clear previous user list

      if (snapshot.exists()) {
        const usersData = snapshot.val();

        // Display each user in the list
        for (const userId in usersData) {
          const user = usersData[userId];
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>${user.name}</strong><br>
            Email: ${user.email}<br>
            Points: ${user.points}<br>
            <button onclick="deleteUser('${userId}')">Delete User</button>
          `;
          userList.appendChild(listItem);
        }
      } else {
        // No users found
        userList.innerHTML = "<li>No users found</li>";
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again.");
    });
}

// Delete a user from the Firebase Realtime Database
function deleteUser(userId) {
  const userRef = ref(database, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully!");
      fetchUsers(); // Refresh the user list after deletion
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    });
}

// Expose the deleteUser function globally for HTML to access
window.deleteUser = deleteUser;

// Toggle the visibility of the user list
document.getElementById("show-users-button").addEventListener("click", function () {
  const userList = document.getElementById("user-list");

  if (userList.style.display === "block") {
    userList.style.display = "none"; // Hide the user list
  } else {
    userList.style.display = "block"; // Show the user list
    fetchUsers(); // Fetch and display the users
  }
});
