export const getDiscountedPrice = (price, dicountPerc) => {
  return price - (price * (dicountPerc ? dicountPerc : 0)) / 100;
};
