let qrs = [];

export default class SQL {
  static AddQR = async text => {
    qrs.push({
      value: text,
      date: new Date()
    })
  };

  static GetQRS = async () => {
    return qrs;
  };
}
