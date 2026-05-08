function loadNavbar() {
    fetch('/navbar/navbar.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });
}
document.addEventListener('DOMContentLoaded', loadNavbar);