import clsx from 'clsx';
import dayjs from 'dayjs';
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const WEEK_DAY = 7;
const SCREEEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAY - (SCREEEN_HORIZONTAL_PADDING + 5);

interface HabitDay extends TouchableOpacityProps {
  completed?: number;
  amount?: number;
}

export function HabitDay({
  completed = 0,
  amount = 0,
  ...rest
}: HabitDay) {
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  return (
    <TouchableOpacity
      {...rest}
      className={clsx('rounded-lg border-2 m-1', {
        'bg-zinc-900 border-zinc-800': completedPercentage === 0,
        'bg-violet-900 border-violet-700':
          completedPercentage > 0 && completedPercentage < 20,
        'bg-violet-800 border-violet-600':
          completedPercentage >= 20 && completedPercentage < 40,
        'bg-violet-700 border-violet-500':
          completedPercentage >= 40 && completedPercentage < 60,
        'bg-violet-600 border-violet-500':
          completedPercentage >= 60 && completedPercentage < 80,
        'bg-violet-500 border-violet-400': completedPercentage >= 80,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    ></TouchableOpacity>
  );
}
