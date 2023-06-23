//FETCH DATA FROM API WITH AXIOS AND RETURN DATA
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `<img src="${imgSrc}" /> ${movie.Title} (${movie.Year})`;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchParameter) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "a98e9233",
        s: searchParameter,
      },
    });
    if (response.data.Error) {
      return response.data;
    }
    return response.data.Search;
  },
};

createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), 'left');
  },
});
createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

//ONCE USER SELECTS MOVIE FROM DROPDOWN
//FETCH MORE INFORMATION ABOUT SPECIFIC MOVIE AND PUSH THAT
//INTO MOVIE TEMPLATE FUNC
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement,side) => {
  const usersChoice = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "a98e9233",
      i: movie.imdbID,
    },
  });

  summaryElement.innerHTML = movieTemplate(
    usersChoice.data
  );

  if (side === 'left') {
    leftMovie = usersChoice.data;
  } else {
    rightMovie = usersChoice.data
  }
  if (leftMovie && rightMovie) {
    runComparison()
  }
};

const runComparison = () => {
  console.log('run compar')
}

const movieTemplate = (movieDetail) => {
  const dollars = 


  return `
    <article class="media"> 
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content> 
        <div class="content">
          <h1><b> ${movieDetail.Title}</b></h1>
          <h4><b>${movieDetail.Genre}</b></h4>
          <p><b>Plot:</b> ${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">BoxOffice</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
