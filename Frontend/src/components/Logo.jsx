export default function Logo() {
  return (
    <div className="flex items-center justify-start col-span-2">
      <img className="w-[41px] h-[41px]" src="/navbar/icon.svg" />
      <div className="flex flex-col items-start justify-center mx-2 logo ">
        <p className="text-white text-[13px]">
          Managment
        </p>
        <p className=" text-[#2a69c7] text-[22px]">
          Boardify
        </p>
      </div>
    </div>
  );
}
