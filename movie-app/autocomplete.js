const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
<label><b>Search</b></label>
<input class='input' />
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
    </div>
  </div>`;

  const input = root.querySelector("input");

  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    if (!items.length) {
      dropdown.classList.remove("is-active");
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      // update render option function for specific use
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};

// Code for reading from Index File
// createAutoComplete({
//   root: document.querySelector(".autocomplete"),
//   renderOption(movie) {
//     const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
//     return `
//     <img src="${imgSrc}"/>
//     ${movie.Title}(${movie.Year})`;
//   },
//   onOptionSelect(movie) {
//     onMovieSelect(movie);
//   },
//   inputValue(movie) {
//     return movie.Title;
//   },
