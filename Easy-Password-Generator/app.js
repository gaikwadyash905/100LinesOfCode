// Required library to generate random words
const faker = require('faker');

// Function to validate if a value is a positive integer
const isPositiveInteger = (value) => Number.isInteger(value) && value >= 0;

// Input Parameters
const WORDS = 2;       // Number of words
const CHARACTERS = 1;  // Number of special characters
const NUMBERS = 4;     // Number of digits
const SEPARATOR = '-'; // Separator between words

// Validate Inputs
if (
    !isPositiveInteger(WORDS) ||
    !isPositiveInteger(CHARACTERS) ||
    !isPositiveInteger(NUMBERS) ||
    WORDS < 1
) {
    console.error("Invalid Input: Ensure WORDS >= 1 and CHARACTERS, NUMBERS >= 0, and all are integers.");
    process.exit(1);
}

try {
    // Generate words separated by the SEPARATOR
    let pass = faker.random.word();
    for (let i = 0; i < WORDS - 1; i++) {
        pass += SEPARATOR + faker.random.word();
    }

    // Define special characters and random selector
    const characters = "~`!@#$%^&*_-+=|:;<,>.?/".split("");
    const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

    // Append random numbers to the end of the password
    for (let i = 0; i < NUMBERS; i++) {
        const num = Math.floor(Math.random() * 10);
        pass += num.toString();
    }

    // Append random special characters to the beginning of the password
    for (let i = 0; i < CHARACTERS; i++) {
        pass = randomChar() + pass;
    }

    // Log the generated password
    console.log("Your password is:", pass);

    // Optional: Provide a strength message without enforcing conditions
    if (pass.length < 8) {
        console.warn(
            "Note: Passwords shorter than 8 characters might be weak for secure applications. Use more words, numbers, or characters for better security."
        );
    }
} catch (error) {
    console.error("An unexpected error occurred:", error.message);
}
