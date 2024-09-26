
const TableTd = ({tdHeading}:{tdHeading:string | number}) => {
  return <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
  {tdHeading}
</td>
}

export default TableTd