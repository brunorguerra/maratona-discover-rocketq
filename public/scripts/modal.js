export default function Modal() {
  let wrapper = document.querySelector(".modal-wrapper");

  document
    .querySelector(".modal-wrapper .modal .button.cancel")
    .addEventListener("click", close);

  function open() {
    wrapper.classList.add("active");
  }
  function close() {
    wrapper.classList.remove("active");
  }

  return {
    open,
    close,
  };
}
