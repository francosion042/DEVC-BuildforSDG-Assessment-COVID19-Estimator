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

    return xml({ root: createXML(this.estimate) });
  }
}

module.exports = Estimator;
