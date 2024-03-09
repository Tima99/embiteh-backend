// Function to convert camelCase to PascalCase
function toPascalCase(camelCase) {
    return (
        camelCase
            // Split camelCase string by capital letters
            .split(/(?=[A-Z])/)
            // Capitalize the first letter of each word
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            // Join the words to form PascalCase
            .join(" ")
    );
}

module.exports = toPascalCase;
