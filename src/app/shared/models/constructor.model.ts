export class Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    return this;
  }
}
