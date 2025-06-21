async function searchMovie() {
  const title = document.getElementById("searchInput").value;
  const apiKey = "YOUR_API_KEY"; // Replace with your OMDb API key
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const resultDiv = document.getElementById("movieResult");

  if (data.Response === "True") {
    resultDiv.innerHTML = `
      <img src="${data.Poster}" alt="${data.Title} Poster" />
      <h2>${data.Title} (${data.Year})</h2>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
    `;
  } else {
    resultDiv.innerHTML = `<p>Movie not found. Try again.</p>`;
  }
}
