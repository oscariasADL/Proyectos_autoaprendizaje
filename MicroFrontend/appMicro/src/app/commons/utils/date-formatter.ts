import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

const months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
];

export function formatMovementDate(date: Date): string {
  const formattedDate = format(date, "d 'de' MMMM", { locale: es });
  const words = formattedDate.split(' ');

  const capitalizedDate = words.map((month: string) => {
    if (months.includes(month.toLowerCase())) {
      return month.charAt(0).toUpperCase() + month.slice(1);
    }
    return month;
  });

  if (isToday(date)) {
    return `Hoy, ${capitalizedDate.join(' ')}`;
  }
  return capitalizedDate.join(' ');
}
