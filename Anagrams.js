function checkAnagrams(text1, text2) {
    const normalize = str => str.toLowerCase().split('').sort().join('');
    return normalize(text1) === normalize(text2);
}

console.log(checkAnagrams('hello', 'how')); 
console.log(checkAnagrams('evil', 'vile'));     
console.log(checkAnagrams('fluster', 'restful'));
