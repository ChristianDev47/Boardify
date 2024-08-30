import PropTypes from "prop-types";
import activity from "../../assets/icons/activity.svg";
import { charValue } from "../../services/getInitialsUsers";

ShowActivity.propTypes = {
  cardActivity: PropTypes.array,
};

export default function ShowActivity({ cardActivity}) {


  return (
    <div className="mt-8">
      <div className="flex">
        <img className="w-[28px] h-auto mr-4" src={activity} alt="" />
        <h3 className=" text-[18px] font-semibold">Actividad</h3>
      </div>
      {cardActivity &&
        cardActivity
          .slice()
          .reverse()
          .map((cardActivity) => {
            const currentDate = new Date();
            const formattedDate = new Date(cardActivity.createdAt);
            const difference = currentDate.getDate() - formattedDate.getDate();
            let data;
            if (difference === 0) {
              data = `Hoy a las ${formattedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            } else if (difference === 1) {
              data = `Ayer a las ${formattedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            } else {
              data = `${formattedDate.getDate()} ${formattedDate.toLocaleString(
                "en-US",
                { month: "short" }
              )} a las ${formattedDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            }
            return (
              <div
                key={cardActivity._id}
                className="grid grid-cols-8 gap-5 mt-4"
              >
                {cardActivity.user_id &&
                cardActivity.user_id &&
                cardActivity.user_id.profile &&
                cardActivity.user_id.profile !== "" ? (
                  <div
                    title={cardActivity.user_id.email}
                    className={`relative col-span-1 cursor-pointer w-[45px] h-auto py-1 px-3  rounded-full aspect-square text-white overflow-hidden transition-all duration-1000 group flex justify-center items-center ${
                      !["png", "jpg", "webp"].includes(
                        cardActivity.user_id.profile
                          .split(".")
                          .pop()
                          .split("?")[0]
                      )
                        ? `bg-[#0065FF]`
                        : `bg-cover bg-center`
                    }`}
                    style={
                      cardActivity.user_id.profile.split(":")[0] == "https"
                        ? {
                            backgroundImage: `url(${cardActivity.user_id.profile})`,
                          }
                        : null
                    }
                  >
                    {cardActivity.user_id.profile.split(":")[0] !== "https" &&
                      charValue(
                        cardActivity.user_id.name,
                        cardActivity.user_id.surname
                      )}
                  </div>
                ) : (
                  cardActivity.user_id.name &&
                  cardActivity.user_id.surname && (
                    <div className=" w-[45px] h-[45px]  bg-[#0065FF] text-[24px] font-bold rounded-full aspect-square text-white flex justify-center items-center ">
                      {charValue(
                        cardActivity.user_id.name,
                        cardActivity.user_id.surname
                      )}
                    </div>
                  )
                )}
                <div className="flex flex-col text-[14px] col-span-7 overflow-hidden">
                  <p>
                    <span className="font-bold">
                      {cardActivity.user_id.name} {cardActivity.user_id.surname}
                    </span>{" "}
                    {cardActivity.cardActivity}
                  </p>
                  <p>{data}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
}
