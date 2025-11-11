import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const SECURITY_HOME_COMPLEMENTARY_SERVICES = {
  id: 'alert-security-home-complementary-services',
  type: AlertSheetType.error,
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'HOME.COMPLEMENTARY_SERVICES_ERROR_ALERT.TITLE',
  description: 'HOME.COMPLEMENTARY_SERVICES_ERROR_ALERT.MESSAGE',
  buttons: ['ACTIONS.COPY_THAT']
};
