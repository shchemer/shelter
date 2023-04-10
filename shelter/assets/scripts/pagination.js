let arrPets = [];
let maxUnique = [];
let midUnique = [];
let minUnique = [];
let uniqueQuantity = {};

for (let i = 0; i < pets.length; i++) {
	arrPets.push(i);
}

function shuffle(array) {
	let arr = array.slice(0, array.length);
	for (let i = arr.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1));
	  [arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function createUnique(array) {
	let shuffleArray; 
	for (let i = 0; i < 6; i++) {
		do {
			shuffleArray = shuffle(array);
		} while (shuffleArray.join('') in uniqueQuantity)
		uniqueQuantity[shuffleArray.join('')] = 1;
		maxUnique.push(shuffleArray);
	}
}

function lessCards(array, pagesCount) {
	let shuffleArray;
	let rest = [];
	if (pagesCount == 8) {
		for (let i = 0; i < pagesCount; i++) {
			shuffleArray = rest.concat(array[i]);
			shuffleArray = shuffle([...(shuffleArray.slice(0, 3)), ...(shuffleArray.slice(3, 6)), ...(shuffleArray.slice(-2))]);
			shuffleArray.length = shuffleArray.length -2;
			rest = shuffleArray.slice(-2);
			midUnique.push(shuffleArray);
		}
	}
}

createUnique(arrPets);
lessCards(maxUnique, 8);

