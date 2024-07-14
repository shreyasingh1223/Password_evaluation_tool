function checkPassword() {
    var password = document.getElementById('password').value;

    // Check length
    var length = document.getElementById('length');
    if (password.length >= 8) {
        length.style.color = 'green';
    } else {
        length.style.color = 'red';
    }

    // Check for numbers
    var numbers = document.getElementById('numbers');
    if (/\d/.test(password)) {
        numbers.style.color = 'green';
    } else {
        numbers.style.color = 'red';
    }

    // Check for lowercase letters
    var lowercase = document.getElementById('lowercase');
    if (/[a-z]/.test(password)) {
        lowercase.style.color = 'green';
    } else {
        lowercase.style.color = 'red';
    }

    // Check for uppercase letters
    var uppercase = document.getElementById('uppercase');
    if (/[A-Z]/.test(password)) {
        uppercase.style.color = 'green';
    } else {
        uppercase.style.color = 'red';
    }

    // Check for special characters
    var specialChars = document.getElementById('specialChars');
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        specialChars.style.color = 'green';
    } else {
        specialChars.style.color = 'red';
    }

    // Send password to server for evaluation
    var data = {
        action: 'evaluate_password',
        password: password
    };

    fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Update strength based on response
        var strength = document.getElementById('strength');
        if (data.strength === 'Strong') {
            strength.style.color = 'green';
        } else {
            strength.style.color = 'red';
        }
        strength.textContent = `Password strength: ${data.strength}`;

        // Update time to crack based on response
        var timeToCrack = document.getElementById('time_to_crack');
        if (data.time_to_crack !== 'None') {
            timeToCrack.textContent = `Estimated time to crack: ${data.time_to_crack}`;
        } else {
            timeToCrack.textContent = '';
        }

        // Update password properties
        document.getElementById('length').textContent = `Length: ${data.properties.length}`;
        document.getElementById('numbers').textContent = `Numbers: ${data.properties.has_numbers}`;
        document.getElementById('lowercase').textContent = `Lowercase letters: ${data.properties.has_lowercase}`;
        document.getElementById('uppercase').textContent = `Uppercase letters: ${data.properties.has_uppercase}`;
        document.getElementById('specialChars').textContent = `Special characters: ${data.properties.has_special}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Dynamic background color change
let colors = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc'];
let currentIndex = 0;

function changeBackgroundColor() {
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeBackgroundColor, 4000); // Change background color every 4 seconds

// Typing effect animation for input fields
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', () => {
    passwordInput.classList.add('typing-animation');
    setTimeout(() => {
        passwordInput.classList.remove('typing-animation');
    }, 200);
});
