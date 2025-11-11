import {
  AlertComponentType,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import { DeadLineTooltip } from '../entities/pocket-detail.interface';

export const DEADLINE_POCKET_TOOLTIP: DeadLineTooltip = {
  id: 'deadline-pocket-popover',
  title: 'Plazo',
  text: 'Es el tiempo que el dinero debe estar en el bolsillo para recibir la rentabilidad.'
};

export const OPEN_FEES_AND_RATES_URL =
  'https://www.avvillas.com.co/productos-en-oficina/ahorro-inversion/bolsillos';

export const FEES_AND_RATES_ALERT = {
  id: 'fees-and-rates-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/cerrar-sesion-regular.svg',
  title: 'Vas a salir de AV Villas App',
  description: 'Seras dirigido a la página de tasas y tarifas vigentes',
  buttons: ['Si, ir a las tasas y tarifas', 'Cancelar']
};
