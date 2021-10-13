const dragList = ['Javascript','React','Vuejs','Angular','c','c++','java'];
const dragContainer = document.querySelector('.drag-container');
const searchBox = document.querySelector('.auto-search');
dragList.forEach(dragList => {
  let newElement = document.createElement('p');
  let newNode = document.createTextNode(dragList);
  newElement.appendChild(newNode);
  newElement.setAttribute('class','draggable fas fa-grip-vertical');
  newElement.setAttribute('draggable','true');
  let newSpan = document.createElement('span');
  newSpan.setAttribute('class','delete-language fas fa-trash-alt');
  newElement.appendChild(newSpan);
  dragContainer.append(newElement);
})
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.drop-container');
const dropElement = document.querySelectorAll('.drop-container .draggable');
const deleteElement = document.querySelectorAll('.delete-language');
deleteElement.forEach(del => {
  del.addEventListener('click',(e) => {
    dragContainer.append(del.parentElement);
  })
})
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
// auto search
searchBox.addEventListener("keyup", function(e) {
  filterList(e.target.value);
});
const filterList = searchTerm => {
const dragElement = document.querySelectorAll('.drag-container .draggable');
const searchEmpty = document.querySelector('.empty-search');
  searchTerm = searchTerm.toLowerCase();
  searchTerm = searchTerm.trim();
  dragElement.forEach(option => {
    let label = option.textContent.toLowerCase();
    label = label.trim();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
      option.classList.remove('search-result');
    } else {
      option.style.display = "none";
      option.classList.add('search-result');
    }
  });
if(document.querySelectorAll('.search-result').length == dragElement.length) {
  searchEmpty.style.display = "block";
}
else {
  searchEmpty.style.display = "none";
}
};