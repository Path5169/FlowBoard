function enableDragAndDrop({ taskLists, onTaskMoved }) {
  taskLists.forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });

    list.addEventListener("drop", (event) => {
      event.preventDefault();
      list.classList.remove("drag-over");

      const taskId = event.dataTransfer.getData("text/plain");
      const nextStatus = list.dataset.status;

      if (taskId && nextStatus) {
        onTaskMoved(taskId, nextStatus);
      }
    });
  });
}

function makeCardDraggable(card, taskId) {
  card.setAttribute("draggable", "true");

  card.addEventListener("dragstart", (event) => {
    card.classList.add("dragging");
    event.dataTransfer.setData("text/plain", taskId);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });
}
