
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
  

  window.onclick = function(event) {
    const dropdown = document.getElementById('profileDropdown');
    if (!event.target.matches('.profile-logo') && !event.target.matches('.dropdown-menu') && !event.target.matches('.dropdown-menu a')) {
      dropdown.style.display = 'none';
    }
  }
  