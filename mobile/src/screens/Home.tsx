import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimunSummaryDateSize = 12 * 7;
const amountOfDaysToFill = minimunSummaryDateSize - datesFromYearStart.length;

interface Summary {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function Home() {
  const { navigate } = useNavigation();
  const [summary, setSummary] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSumary = async () => {
      setLoading(true);
      try {
        const response = await api.get('summary');
        setSummary(response.data);
      } catch (error) {
        Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getSumary();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row mt-6 mb-2">
          {weekDays.map((weekDay, index) => (
            <Text
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))}
        </View>
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date, index) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                key={index}
                onPress={() => navigate('habit', { date: date.toISOString() })}
                completed={dayInSummary?.completed}
                amount={dayInSummary?.amount}
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
