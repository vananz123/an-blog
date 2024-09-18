
import {
  Pagination as PaginationS,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface Props{
  currentPage:number;
  total:number;
  onPage:(page:number)=> void;
}
function Pagination({currentPage,total , onPage}:Props) {
  const handlePrevious = () => {
    const page= Math.max(currentPage - 1, 1)
    onPage(page)
  }

  const handleNext = () => {
    const page= Math.min(currentPage +1, total)
    onPage(page)
  }
  const handleClick = (page:number)=>{
    onPage(page)
  }
  return (
    <PaginationS>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious} 
            //disabled={currentPage === 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={()=> handleClick(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage > 2 && <PaginationEllipsis />}
        {currentPage !== 1 && currentPage !== total && (
          <PaginationItem>
            <PaginationLink isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < total - 1 && <PaginationEllipsis />}
        {total > 1 && (
          <PaginationItem>
          <PaginationLink onClick={()=> handleClick(total)} isActive={currentPage === total}>
            {total}
          </PaginationLink>
        </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext} 
            //disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationS>
  )
}

export default Pagination;
