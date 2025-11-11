import { faker } from '@faker-js/faker';
import {
  CardDetail,
  DigitalCardStructureExt
} from '@modules/wallets/entities/wallets.interface';

export class WalletsFactory {
  public createCardList(): CardDetail[] {
    return new Array(4).fill(0).map((_, index) => {
      return {
        acctId: faker.finance.creditCardNumber(),
        cardNumber: faker.string
          .hexadecimal({ length: 32, prefix: '' })
          .toUpperCase(),
        cardEmbossNum: faker.finance.maskedNumber({
          length: 4,
          parens: false,
          ellipsis: false
        }),
        encryptedCardNumber: faker.string.alphanumeric(50),
        cardNumberDecrypted: faker.finance.creditCardNumber(),
        ccMotoAcct: {
          expDt: faker.string
            .hexadecimal({ length: 32, prefix: '' })
            .toUpperCase(),
          expDateDecrypted: faker.finance.maskedNumber({
            length: 4,
            parens: false,
            ellipsis: false
          }),
          cardVrfyData: faker.string.alphanumeric(50),
          walletInfo: []
        }
      };
    });
  }

  public createWalletCardList(): DigitalCardStructureExt[] {
    return new Array(4).fill(0).map((_, index) => ({
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement(['Active', 'Inactive']),
      lastDigits: faker.string.numeric(4),
      bin: '5' + faker.string.numeric(5),
      expirationDate: faker.string
        .hexadecimal({ length: 32, prefix: '' })
        .toUpperCase(),
      imageIsLoaded: true,
      canPushCardInWalletPay: true
    }));
  }
}
