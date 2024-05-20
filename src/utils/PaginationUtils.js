export default function calculatePageRange(selectedPage, totalPages) {
    const maxPagesToShow = 10;
    const pagesToShow = [];
    
    // If total pages are less than or equal to maxPagesToShow, display all pages
    if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pagesToShow.push(i);
        }
    } else {
        // Calculate the start and end pages to display
        let startPage = selectedPage - 5;
        let endPage = selectedPage + 4;
  
        // If start page is less than 1, adjust the range
        if (startPage < 1) {
            startPage = 1;
            endPage = maxPagesToShow;
        }
  
        // If end page is greater than total pages, adjust the range
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - (maxPagesToShow - 1);
        }
  
        for (let i = startPage; i <= endPage; i++) {
            pagesToShow.push(i);
        }
    }
    return pagesToShow;
  }