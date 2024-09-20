
const Slide = () => {
 
  return (
    <div className="flex flex-col md:flex-row justify-center items-center pb-12">
    <div className="relative md:w-1/3 ">
      <div className=" h-[280px] mt-5 w-[280px]  rounded-full bg-primary flex justify-center items-center shadow-xl shadow-slate-800">
        <img
          className="z-10 min-h-[225px] max-w-[225px] border-8 rounded-full border-white"
          src="https://i.ibb.co.com/5kcshpR/image-2.png"
          alt=""
        />
      </div>
      <div className="absolute -left-[10%] bottom-[20%] md:bottom-[25%] ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="241"
          height="241"
          viewBox="0 0 241 241"
          fill="none"
         
        >
          <g filter="url(#filter0_d_4_16)">
            <circle cx="105.5" cy="105.5" r="97.5" fill="#ff4d6d" />
          </g>
          <defs>
            <filter
              id="filter0_d_4_16"
              x="0"
              y="0"
              width="241"
              height="241"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="8"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_4_16"
              />
              <feOffset dx="15" dy="15" />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_4_16"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_4_16"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
      <div className="  flex flex-col ">
        <div className="relative flex ">
            <img src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
            <img className="absolute left-10" src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
        </div>
      <div className="relative ">
      <p className="md:max-w-[550px] text-[#6A6464] md:ml-20 md:text-3xl text-xl ">
        I am satisfied with the training given by XYZ Pvt. Ltd on Web Designing. During training, the faculty was able to clear my doubts regarding design process.1
        </p>
        
        <div className="absolute right-0  -bottom-12  md:-bottom-9 rotate-180  ">
        <div className="relative  flex">
        <img src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
        <img className="absolute left-10" src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
        </div>
        </div>
      </div>
        <strong className="mt-7 md:ml-20 inter md:text-5xl md:font-extrabold text-[#6A6464]">Varsha Adhikari</strong>
      </div>
      </div>
  )
}

export default Slide