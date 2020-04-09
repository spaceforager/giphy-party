const gifDisplay = document.querySelector('#gif-disp');

// make AJAX call
async function search(term) {
	const res = await axios.get(
		`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
	);
	return res.data;
}

// Append gif result to a created div
function addGIF(result) {
	let dataLength = result.data.length;

	if (dataLength) {
		let randIndex = Math.floor(Math.random() * dataLength);
		let newCol = document.createElement('DIV');
		newCol.classList.add('col-md-4', 'col-12', 'mb-4');
		let newGIF = document.createElement('IMG');
		newGIF.setAttribute('src', `${result.data[randIndex].images.downsized.url}`);

		newCol.appendChild(newGIF);
		gifDisplay.appendChild(newCol);
	}
}

// handle form submission and clear search box
const form = document.querySelector('#form');
form.addEventListener('submit', async function(e) {
	e.preventDefault();
	let input = document.querySelector('#inp');

	const newAPIData = await search(input.value);
	addGIF(newAPIData);
	input.value = '';
});

const $gifDisplay = $(gifDisplay);
$('#rem').on('click', function() {
	$gifDisplay.empty();
});
