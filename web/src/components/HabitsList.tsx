import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
  onAmountUpdated: (amount: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({
  date,
  onCompletedChanged,
  onAmountUpdated,
}: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    const getHabits = async () => {
      const response = await api.get('day', {
        params: {
          date: date.toISOString(),
        },
      });
      const habits = response.data as HabitsInfo;
      setHabitsInfo(habits);
      onAmountUpdated(habits.possibleHabits.length);
    };
    getHabits();
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/${date.toISOString()}/toogle`);
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);
    let completedHabits = [];
    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId,
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          className="flex items-center gap-3 group"
          onCheckedChange={() => handleToggleHabit(habit.id)}
          key={habit.id}
          defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 leading-tight group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
