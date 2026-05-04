function loadFooter() {
   
    fetch('/footer/footer.html') 
        .then(response => {
            if (!response.ok) throw new Error('Footer file not found');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}


document.addEventListener('DOMContentLoaded', loadFooter);