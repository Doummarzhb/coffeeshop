import { ComponentModule } from "./component.module";

describe('ComponentsModule', () => {
  let componentsModule: ComponentModule;

  beforeEach(() => {
    componentsModule = new ComponentModule();
  });

  it('should create an instance', () => {
    expect(componentsModule).toBeTruthy();
  });
});
