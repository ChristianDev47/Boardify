import instagram from "../../src/assets/icons/instagram.svg";
import twitter from "../../src/assets/icons/twitter.svg";
import face from "../../src/assets/icons/face.svg";
import Logo from "./Logo";
export default function Footer() {
  return (
    <div className="w-full 2xl:h-[320px] xl:h-[320px] lg:h-[320px] md:h-[380px] sm:h-[400px] bg-[#000000ee] flex items-center justify-center ">
      <div className="w-full px-6 max-w-7xl">
      <div className="grid w-full grid-cols-4 gap-2 py-12 text-white sm:grid-cols-3">
        <div className="flex flex-col items-start justify-start sm:hidden mv:hidden">
          <Logo/>
          <div className="flex my-4 space-x-5">
            <img className="w-[30px] h-auto" src={instagram} alt="" />
            <img className="w-[30px] h-auto" src={twitter} alt="" />
            <img className="w-[30px] h-auto" src={face} alt="" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className={` text-[16px]`}>CONTACT</h1>
          <div className="flex flex-col items-start justify-center my-4">
            <p className="mb-2 text-[13px] sm:ml-0">
              1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad
            </p>
            <p className="my-2 text-[13px] sm:ml-0">
              +591 68846448 <br />
              +591 68488464
            </p>
            <p className="my-2 text-[13px] sm:ml-0">
              user@gmail.com <br />
              admin@gmail.com
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className={` text-[16px]`}>INFORMACIÓN</h1>
          <ul className="my-4 space-y-6 text-[13px]">
            <li>
              <a href="/">Preguntas frecuentes</a>
            </li>
            <li>
              <a href="/">Política de privacidad</a>
            </li>
            <li>
              <a href="/">Terminos y condiciones de uso</a>
            </li>
            <li>
              <a href="/">Aviso legal</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className={` text-[16px]`}>NUESTROS LINKS</h1>
          <ul className="my-4 space-y-6 text-[13px]">
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/characteristics">Carcateristicas</a>
            </li>
            <li>
              <a href="/how_works">Cómo funciona</a>
            </li>
            <li>
              <a href="/about">Sobre Nosotros</a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}
