const priceDivide = (price) => {
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export default priceDivide;
