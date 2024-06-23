function checkPalindrome(input) {
    const Input = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    for (let i = 0, j = Input.length - 1; i < j; i++, j--) {
        if (Input[i] !== Input[j]) {
            return false;
        }
    }
    return true;
}

console.log(checkPalindrome("hello"));  
console.log(checkPalindrome("racecar")); 

