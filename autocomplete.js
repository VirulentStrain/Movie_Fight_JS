const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
  <div class="dropdown">
    <label class="label">Movie Search
      <input class="input is-primary" type="text">
    </label>
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;
  //GETTING SEARCH INPUT AND DROPDOWN ELEMENTS
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //FUNC RUNS ON INPUT
  //CHECKS WHETHER OR NOT USER IS STILL TYPING
  //WHEN USER IS DONE TYPING -- FETCHS API DATA
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    if (event.inputType === "deleteContentBackward") {
      resultsWrapper.innerHTML = ``;
      dropdown.classList.remove("is-active");
      return;
    }
    //CHECK FOR ERRORS AND DISPLAY THEM
    if (items.Error) {
      // input.value = "";
      input.setAttribute("placeholder", `${items.Error}`);
      input.classList.add("is-danger");
      dropdown.classList.remove("is-active");
      return;
    }
    //REMOVES RED BORDER FROM INPUT
    //MAKES DROPDOWN VISIBLE
    //ERASES PREVIOUS RESULTS
    resultsWrapper.innerHTML = "";
    input.classList.remove("is-danger");
    dropdown.classList.add("is-active");
    //LOOP THROUGH THE OBJECT AND DISPLAY EACH MOVIE
    for (const item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      //CLICK HANDLES TO UPDATE INPUT VALUE TO WHAT THE USER CLICKS
      option.addEventListener("click", function () {
        input.value = inputValue(item);
        dropdown.classList.remove("is-active");
        onOptionSelect(item);
      });
      resultsWrapper.append(option);
    }
  };

  //ATTACHING EVENT LISTENER TO INPUT EL
  //RUNNING ONINPUT FUNC ON INPUT
  input.addEventListener("input", debounce(onInput, 500));

  //EVENT LISTENER (CLICK) TO CLOSE OUT OF DROPDOWN
  document.addEventListener("click", function (event) {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
