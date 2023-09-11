export default interface IPaginationProps {
    currentPage: number
    lastPage: number
    maxLength: number
    setCurrentPage: (page: number) => void
}