
const DetailsDt = ({title, val}:{title: string, val: (string | number)}) => {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">{title}</dt>
      <dd className="text-gray-700 sm:col-span-2">{val}</dd>
    </div>
  )
}

export default DetailsDt