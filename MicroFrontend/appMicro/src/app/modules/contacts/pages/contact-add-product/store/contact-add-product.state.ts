export const contactAddProductFeatureName = 'contactAddProductState';

export type ContactAddProductState = Readonly<{
  working: boolean;
  completed: boolean;
  message: string;
}>;

export const initialContactAddProductState: ContactAddProductState = {
  working: false,
  completed: false,
  message: ''
};
