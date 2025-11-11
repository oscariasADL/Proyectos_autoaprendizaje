export abstract class AbstractFactory {
  public abstract create(): any;

  public createBulk(quantity: number): any[] {
    const items: any[] = [];

    for (let i = 0; i < quantity; i++) {
      items.push(this.create());
    }

    return items;
  }
}
