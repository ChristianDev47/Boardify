export const charValue = (name, surname) => {
  if(name && surname){
    const letters = [name, surname].map((char) => {
      return char.slice(0, 1);
    });
    const char = letters.join("").toUpperCase();
    return char;
  }
};
