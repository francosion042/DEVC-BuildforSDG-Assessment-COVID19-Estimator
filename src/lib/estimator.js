const xml = require('xml');

class Estimator {
  constructor(estimator, data) {
    this.estimate = estimator(data);
  }

  toJSON() {
    return this.estimate;
  }

  toXML() {
    const createXML = (object) => {
      const objectKeys = Object.keys(object);
      const xmlElement = [];

      if (typeof object !== 'object') {
        return object;
      }

      objectKeys.forEach((childKey) => {
        xmlElement.push({ [childKey]: createXML(object[childKey]) });
      });

      return xmlElement;
    };

    const xmlString = xml({ root: createXML(this.estimate) });

    return xmlString;
  }
}

module.exports = Estimator;
