// Smooth scrolling for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation and submission
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Basic validation for required fields
    if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes, send data to backend
    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            })
        });

        if (response.ok) {
            alert('Message sent successfully!');
            this.reset(); // Reset form after submission
        } else {
            alert('Failed to send message. Please try again later.');
        }
    } catch (error) {
        alert('Error: Could not reach server. Please try again later.');
        console.error('Error:', error);
    }
});

// Intersection Observer for project animations
const projectCards = document.querySelectorAll('.project');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, {
    threshold: 0.3
});

projectCards.forEach(card => {
    observer.observe(card);
});

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Show the back-to-top button when the user scrolls down
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
};

// Smooth scroll to the top when the back-to-top button is clicked
document.getElementById("backToTop").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
