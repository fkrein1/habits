import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { Loading } from '../components/Loading';
import { ProgressBar } from '../components/ProgressBar';
import { api } from '../lib/axios';

interface Params {
  date: string;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function Habit() {
  const [loading, setLoading] = useState(false);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const route = useRoute();
  const { date } = route.params as Params;

  useEffect(() => {
    const getHabits = async () => {
      setLoading(true);
      try {
        const response = await api.get('day', {
          params: {
            date,
          },
        });
        const habits = response.data as HabitsInfo;
        setHabitsInfo(habits);
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Ops',
          'Não foi possível carregar as informações dos hábitos',
        );
      } finally {
        setLoading(false);
      }
    };
    getHabits();
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/${date}/toogle`);
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
  }

  function progressBarStatus() {
    if (!habitsInfo?.completedHabits) {
      return 0;
    }
    return (
      (habitsInfo.completedHabits.length / habitsInfo.possibleHabits.length) *
      100
    );
  }

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={progressBarStatus()} />
        <View className="mt-6">
          {habitsInfo?.possibleHabits.map((habit) => (
            <Checkbox
              key={habit.id}
              title={habit.title}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              onPress={() => handleToggleHabit(habit.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
