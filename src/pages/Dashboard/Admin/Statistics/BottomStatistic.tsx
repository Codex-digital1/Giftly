const dashboardUserData = [
    {
      image: "https://avatars.githubusercontent.com/u/130208279?v=4",
      name: "Hammad Sadi",
      email: "john.doe@example.com",
      role: "Admin",
      color: "#007bff",
    },
    {
      image: "https://avatars.githubusercontent.com/u/155248034?v=4",
      name: "Sajjad Hosen Sohan",
      email: "jane.smith@example.com",
      role: "Admin",
      color: "#ffc107",
    },
    {
      image:
        "https://avatars.githubusercontent.com/u/147589677?s=96&v=4",
      name: "Sahadat Hosen",
      email: "ssar96540@gmail.com",
      role: "Admin",
      color: "#28a745",
    },
    {
      image: "https://avatars.githubusercontent.com/u/155246328?v=4",
      name: "Amir Hosen Antar",
      email: "designimb@gmail.com",
      role: "Admin",
      color: "#007bff",
    },
   
     
  ];

const BottomStatistic = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8">
        {/* user info */}
        {dashboardUserData.map((userInfoItem, ind) => {
          const { name, email, role, image, color } = userInfoItem;
          return (
            <div
              key={ind}
              className="p-4 md:p-6 rounded-md bg-gray-100 flex flex-col  text-center justify-center lg:justify-start lg:items-start items-center gap-4 md:gap-6"
            >
              {/* image */}
              <img
                className="size-[70px] rounded-full object-cover"
                src={image}
                alt=""
              />

              {/* content */}
              <div className="flex flex-col justify-center lg:justify-normal text-center space-y-2 md:text-left break-words text-wrap">
                <h5 className="text-primary md:text-lg">{name}</h5>
                <small className="text-text-color text-xs break-words text-wrap lg:max-w-[150px]">
                  {email}
                </small>
                <span
                  style={{ color: color }}
                  className="text-xs font-semibold uppercase"
                >
                  {role}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    );
};

export default BottomStatistic;