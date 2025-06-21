const apiKey = "YOUR_API_KEY"; // Replace with your OMDb API key

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  if (data.Response === "True") {
    data.Search.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" />
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
      `;
      card.onclick = () => showMovieDetails(movie.imdbID);
      resultsDiv.appendChild(card);
    });
  } else {
    resultsDiv.innerHTML = "<p>No results found.</p>";
  }
}

async function showMovieDetails(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
  const response = await fetch(url);
  const movie = await response.json();

  const details = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster}" style="width:200px" />
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
  `;

  document.getElementById("movieDetails").innerHTML = details;
  document.getElementById("movieModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}
