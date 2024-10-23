import { OrderTypesProps } from "../../../../types/Types"

const SinglerOrderAndUserDetails = ({order}:OrderTypesProps) => {
    console.log(order?.product_image)
  return (
    <div>
        {/* Product Image */}
        <div className="flex justify-center items-center gap-2 flex-wrap">
            {order?.product_image?.map((ig:string, idx:number) => <div key={idx}><img src={ig} className="max-w-20" alt="" /></div>)}
            
        </div>
    </div>
  )
}

export default SinglerOrderAndUserDetails