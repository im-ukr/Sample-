document.addEventListener('DOMContentLoaded', (event) => {
    const people = [
        'Alice', 'Bob', 'Charlie', 'David', 'Eva', 
        'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'
    ];
    const numPeople = people.length;
    const judgeIndex = Math.floor(Math.random() * numPeople);
    const trustMatrix = generateTrustMatrix(numPeople, judgeIndex);

    const cardsContainer = document.getElementById('cardsContainer');

    for (let i = 0; i < numPeople; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = people[i];
        card.onclick = () => showTrust(i, people, trustMatrix, judgeIndex);
        cardsContainer.appendChild(card);
    }
});

function generateTrustMatrix(numPeople, judgeIndex) {
    const trustMatrix = [];
    for (let i = 0; i < numPeople; i++) {
        trustMatrix.push([]);
        for (let j = 0; j < numPeople; j++) {
            if (i !== j && Math.random() > 0.7) {
                trustMatrix[i].push(j);
            }
        }
    }
    // The judge trusts a random set of people, lying about their trust.
    trustMatrix[judgeIndex] = generateLie(numPeople, judgeIndex);
    return trustMatrix;
}

function generateLie(numPeople, judgeIndex) {
    const lie = [];
    while (lie.length < 3) {
        const randomIndex = Math.floor(Math.random() * numPeople);
        if (randomIndex !== judgeIndex && !lie.includes(randomIndex)) {
            lie.push(randomIndex);
        }
    }
    return lie;
}

function showTrust(personIndex, people, trustMatrix, judgeIndex) {
    const trustList = trustMatrix[personIndex].map(index => people[index]).join(', ');
    alert(`${people[personIndex]} trusts: ${trustList}`);
    
    const result = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    result.classList.remove('hidden');
    if (personIndex === judgeIndex) {
        resultText.innerText = `Congratulations! You found the Town Judge: ${people[personIndex]}`;
    } else {
        resultText.innerText = `${people[personIndex]} is not the Town Judge. Try again!`;
    }
}
