// TODO Generate from backend
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const alertBrebSupport = (tit, desc) => ({
  id: 'alert-breb-support-info',
  type: AlertSheetType.question,
  icon: AlertSheetIcon.brebSupport,
  title: tit,
  descriptionHtml: desc,
  buttons: ['Entendido']
});
