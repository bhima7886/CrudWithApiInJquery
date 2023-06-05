$(document).ready(function() {
  var apiUrl = 'https://example.com/api/users'; // Replace with your API endpoint

  // Function to retrieve user data from the API and update the table
  function getUsers() {
    $.ajax({
      url: apiUrl,
      type: 'GET',
      success: function(data) {
        updateTable(data);
      },
      error: function(error) {
        console.error('Error fetching users:', error);
      }
    });
  }

  // Function to add a new user via the API and update the table
  function addUser(name, email) {
    var userData = { name: name, email: email };

    $.ajax({
      url: apiUrl,
      type: 'POST',
      data: userData,
      success: function() {
        getUsers();
      },
      error: function(error) {
        console.error('Error adding user:', error);
      }
    });
  }

  // Function to delete a user via the API and update the table
  function deleteUser(id) {
    $.ajax({
      url: apiUrl + '/' + id,
      type: 'DELETE',
      success: function() {
        getUsers();
      },
      error: function(error) {
        console.error('Error deleting user:', error);
      }
    });
  }

  // Function to update a user via the API and update the table
  function updateUser(id, name, email) {
    var userData = { name: name, email: email };

    $.ajax({
      url: apiUrl + '/' + id,
      type: 'PUT',
      data: userData,
      success: function() {
        getUsers();
      },
      error: function(error) {
        console.error('Error updating user:', error);
      }
    });
  }

  // Function to update the table with the latest user data
  function updateTable(users) {
    var tableBody = $('#userTable tbody');
    tableBody.empty(); // Clear existing table rows

    // Iterate over the users array and create table rows
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var row = $('<tr>');
      row.append($('<td>').text(user.name));
      row.append($('<td>').text(user.email));
      row.append($('<td>').html('<button class="updateBtn" data-id="' + user.id + '">Update</button> <button class="deleteBtn" data-id="' + user.id + '">Delete</button>'));
      tableBody.append(row);
    }
  }

  // Event handler for the form submission
  $('#userForm').submit(function(e) {
    e.preventDefault(); // Prevent form submission

    var name = $('#name').val();
    var email = $('#email').val();

    addUser(name, email);

    // Clear input fields
    $('#name').val('');
    $('#email').val('');
  });

  // Event handler for delete button clicks
  $(document).on('click', '.deleteBtn', function() {
    var id = $(this).data('id');
    deleteUser(id);
  });

  // Event handler for update button clicks
  $(document).on('click', '.updateBtn', function() {
    var id = $(this).data('id');
    var name = prompt('Enter updated name:');
    var email = prompt('Enter updated email:');

    if (name && email) {
      updateUser(id, name, email);
    }
  });

  // Fetch initial user data
  getUsers();
});
