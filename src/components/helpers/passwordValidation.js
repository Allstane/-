export default function PasswordValidation(password) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const minLength = 8
    
    const result = lowerCaseLetters.test(password) && upperCaseLetters.test(password) && numbers.test(password) && password.length >= minLength
    return result
}