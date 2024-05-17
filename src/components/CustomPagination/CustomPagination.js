import { Pagination } from 'antd'

export default function CustomPagination(props) {
  const { currentPage, totalPages, onChange } = props
  return (
    <div className="paginationContainer">
      <Pagination current={currentPage} total={totalPages} onChange={onChange} className="dataLayout-pagination" />
    </div>
  )
}
