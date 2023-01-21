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

interface HabitDay extends TouchableOpacityProps {}

export function HabitDay({ ...rest }: HabitDay) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    ></TouchableOpacity>
  );
}
