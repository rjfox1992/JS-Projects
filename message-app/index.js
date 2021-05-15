const { hash } = window.location;
//Displaying message
const message = atob(hash.replace("#", ""));

if (message) {
  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#message-show").classList.remove("hide");
  document.querySelector("h1").innerHTML = message;
}
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  //Control Element Visibility
  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#link-form").classList.remove("hide");
  // Obtain and encrypt input to URL
  const input = document.querySelector("#message-input");

  const encrypt = btoa(input.value);

  const linkInput = document.querySelector("#link-input");
  linkInput.value = `${window.location}#${encrypt}`;
  linkInput.select();
});
