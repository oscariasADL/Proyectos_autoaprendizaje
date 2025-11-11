import { DataBasicClientDto } from '@commons/entities/auth/auth.entities';
import { ActivateTokenPayload } from '@modules/wallets/pages/activate-token/entities/activate-token.interface';

export function mapActivateTokenPayload(
  token: string,
  userData: DataBasicClientDto
): ActivateTokenPayload {
  return {
    tokenInfo: {
      token
    },
    desc: 'Activacion de cuenta',
    custInfo: {
      orgInfo: {
        organizationName: 'ADL'
      },
      custName: {
        legalName: userData.clientName
      },
      participantId: userData.documentNumber
    }
  };
}
