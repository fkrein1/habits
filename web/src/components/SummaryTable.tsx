import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { HabitDay } from './HabitDay';

export function SummaryTable() {
  const summaryDates = generateRangeDatesFromYearStart();
  const minimunSummaryDateSize = 18 * 7; // 18 weeks
  const amountOfDaysToFill = minimunSummaryDateSize - summaryDates.length;
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
            ></div>
          ))}
      </div>
    </div>
  );
}
