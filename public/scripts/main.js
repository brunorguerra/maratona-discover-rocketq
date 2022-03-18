import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal-wrapper .modal h1");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

const buttonsMarkRead = document.querySelectorAll(".actions a.check");

buttonsMarkRead.forEach((button) => {
  button.addEventListener("click", handleClick);
});

const buttonsDeleteQuestion = document.querySelectorAll(".actions a.delete");

buttonsDeleteQuestion.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleClick(event, false);
  });
});

function handleClick(event, isMarked = true) {
  event.preventDefault();

  const slug = isMarked ? "check" : "delete";
  const roomId = document.getElementById("room-id").dataset.id;
  const questionId = event.target.dataset.id;
  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = isMarked ? "Marcar como Lido" : "Excluir Pergunta";
  modalDescription.innerHTML = isMarked
    ? "Tem certeza que deseja marcar esta pergunta como lido?"
    : "Tem certeza que deseja excluir esta pergunta?";
  modalButton.innerHTML = isMarked ? "Sim, marcar" : "Sim, excluir";
  isMarked
    ? modalButton.classList.remove("red")
    : modalButton.classList.add("red");

  modal.open();
}
