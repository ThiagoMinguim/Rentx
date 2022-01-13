import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { generateInterval } from './generateInterval'
import { ptBR } from './localeConfig'

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps
} from 'react-native-calendars'

interface DayProps {
  dateString: string
  day: number
  month: number
  timestamp: number
  year: number
}

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme()
  return (
    <CustomCalendar
      renderArrow={direction => (
        <Feather
          size={24}
          color={theme.colors.shape}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secundary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.font.primary_400,
        textDayHeaderFontFamily: theme.font.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontWeight: 'bold',
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType={'period'}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  )
}

export { DayProps, generateInterval, CalendarProps }
