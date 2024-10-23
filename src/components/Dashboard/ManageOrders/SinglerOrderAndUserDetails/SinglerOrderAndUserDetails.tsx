import { OrderTypesProps } from "../../../../types/Types"

const SinglerOrderAndUserDetails = ({order}:OrderTypesProps) => {
    console.log(order?.product_image)
  return (
    <div>
        {/* Product Image */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
            {order?.product_image?.map((ig:string, idx:number) => <div key={idx}><img src={ig} className="max-w-20" alt="" /></div>)}
            
        </div>
        {/* Others Info */}
        <div>
{/* Top Info */}
<div className="mt-2">
    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">{order?.product_name}</h2>
    <div className="flow-root">
  <dl className="-my-3 divide-y divide-gray-100 text-sm">
    {/* <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">Title</dt>
      <dd className="text-gray-700 sm:col-span-2">Mr</dd>
    </div> */}

   

   

   
  </dl>
</div>
</div>
        </div>
    </div>
  )
}

export default SinglerOrderAndUserDetails