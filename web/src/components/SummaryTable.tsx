import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { HabitDay } from './HabitDay';

const summaryDates = generateRangeDatesFromYearStart();
const minimunSummaryDateSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimunSummaryDateSize - summaryDates.length;
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

interface Summary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    const getSumary = async () => {
      const response = await api.get('summary');
      setSummary(response.data);
    };

    getSumary();
  }, []);

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
        {summary.length > 0 && summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day');
          });
          return (
            <HabitDay
              date={date}
              defaultCompleted={dayInSummary?.completed}
              defaultAmount={dayInSummary?.amount}
              key={date.toString()}
            />
          );
        })}

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
