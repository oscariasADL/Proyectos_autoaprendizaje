import {
  InitSlideI,
  SetdataI,
  VerifyFieldI
} from '@modules/templates/generic-stepper/entities/generic-stepper.entity';

export const GenericStepperInit: (
  initSlide: InitSlideI,
  setData: SetdataI,
  verifyField?: VerifyFieldI
) => ClassDecorator = (initSlide, setData, verifyField) => {
  const { backUrl, steps, exitData, data, confirmMapper, voucherMapper } =
    setData;
  return (component) => {
    component.prototype._initSlide = initSlide;
    component.prototype.steps = steps;
    component.prototype._dataFunction = data;
    component.prototype.backUrl = backUrl;
    component.prototype.exitData = exitData;
    component.prototype._confirmMapper = confirmMapper;
    component.prototype._voucherMapper = voucherMapper;
    component.prototype._verifyField = verifyField;
  };
};

export function GenericStepperfeePayload<T>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  target.constructor.prototype._feePayload = descriptor.value;
  return descriptor;
}

export function GenericStepperGMFPayload<T>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  target.constructor.prototype._gmfPayload = descriptor.value;
  return descriptor;
}

export function GenericStepperAction<T>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
  target.constructor.prototype._stepperAction = descriptor.value;
  return descriptor;
}
