import PropTypes from "prop-types";
import close from "../../assets/icons/x.svg";
import { DeleteCard, GetCardByList, UpdateCards } from "../../services/project";
import { useCard } from "../../hook/card";

CardDelete.propTypes = {
  setShowModalCard: PropTypes.func.isRequired,
  myCard: PropTypes.object.isRequired,
};

export default function CardDelete({ setShowModalCard, myCard }) {
  const { cardsAllData, updateCardData, clearMyCard } = useCard();
  const { cards } = cardsAllData;

  const handleDeleteCard = async () => {
    const cardData = await GetCardByList({ listId: myCard.list_id._id });
    cardData.map(async (card) => {
      if (card.position > myCard.position) {
        const myCardData = {
          position: card.position - 1,
        };
        await UpdateCards({ id: card._id, data: myCardData });
      }
    });
    await DeleteCard({ id: myCard._id });
    updateCardData({
      ...cards,
      [myCard.list_id._id]: cards[myCard.list_id._id].filter((card) => {
        if (card._id !== myCard._id) {
          if (card.position !== 1) {
            return {
              ...card,
              position: card.position - 1,
            };
          }
          return card;
        }
      }),
    });
    clearMyCard();
  };

  return (
    <div className="absolute 2xl:top-28 xl:top-28 lg:top-28 md:bottom-0 sm:bottom-0 2xl:left-0 xl:left-0 lg:left-0 md:right-0 sm:right-0 w-[300px] h-auto bg-[#2a2a2a] rounded-md shadow-2xl z-50">
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="mt-4 mb-2 text-center">Eliminar</h1>
        <p>Estas seguro de querer eliminar la tajeta</p>
        <div
          onClick={() => setShowModalCard(false)}
          className="absolute bg-transparent cursor-pointer right-4 top-4 hover:bg-gray-500"
        >
          {" "}
          <img className="w-[18px] h-auto" src={close} alt="" />
        </div>
      </div>
      <div className="p-3">
        <button
          onClick={() => handleDeleteCard()}
          className="w-full p-2 bg-gray-600 rounded-md text-start hover:bg-gray-500"
        >
          Eliminar tarjeta
        </button>
      </div>
    </div>
  );
}
