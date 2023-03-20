// 페이지 업데이트
export function updatePagination(numItems, itemsPerPage, currentPage, pageNationEl) {
  const numPages = Math.ceil(numItems / itemsPerPage);
  pageNationEl.innerHTML = '';

  const groupSize = 5;
  const groupIndex = Math.floor((currentPage - 1) / groupSize);
  const startPage = groupIndex * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, numPages);

  const firstLink = createPaginationLink(currentPage - groupSize, '<<', currentPage);
  pageNationEl.appendChild(firstLink);

  const prevLink = createPaginationLink(currentPage - groupSize, '<', currentPage);
  pageNationEl.appendChild(prevLink);
  if (currentPage === 1) {
    disableLink(firstLink);
    disableLink(prevLink);
  }

  for (let i = startPage; i <= endPage; i++) {
    const link = createPaginationLink(i, i, currentPage);
    pageNationEl.appendChild(link);
  }

  const nextLink = createPaginationLink(currentPage + 1, '>', currentPage);
  pageNationEl.appendChild(nextLink);

  const lastLink = createPaginationLink(numPages, '>>', currentPage);
  pageNationEl.appendChild(lastLink);
  if (currentPage === numPages) {
    disableLink(nextLink);
    disableLink(lastLink);
  }
}

// 페이지 생성
function createPaginationLink(pageNumber, label, currentPage) {
  const link = document.createElement('a');
  link.classList.add('dashboard-link');
  link.href = '#';
  if (typeof label === 'number') {
    link.classList.add('page-link');
    if (label === currentPage) {
      link.classList.add('active-link');
    }
  } else {
    link.classList.add('arrow-link');
  }
  link.dataset.page = pageNumber;
  link.textContent = label;
  return link;
}

function disableLink(link) {
  link.disabled = true;
  link.classList.add('arrow-link-unactive');
}

export function displayPage(pageNum, itemsPerPage, listItems) {
  const startIndex = (pageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  listItems.forEach((item) => {
    item.style.display = 'none';
  });

  for (let i = startIndex; i < endIndex && i < listItems.length; i++) {
    listItems[i].style.display = 'flex';
  }
}