import Slider from "./Slider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Section1 from "./Principal/Sec1";
import Section2 from "./Principal/Sec2";
import Section3 from "./Principal/Sec3";
import Section4 from "./Principal/Sec4";

export default function Principal() {
  return (
    <>
      <Navbar />
      <Slider />
      <div className="w-full h-full bg-gradient-to-r from-[#1F2130] to-[#1f2550] flex flex-col justify-center items-center py-[3rem] text-white">
       <div className="w-full px-6 space-y-32 max-w-7xl">
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
       </div>
      </div>
      <Footer />
    </>
  );
}
