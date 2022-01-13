import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles'
import { StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import {
  Calendar,
  DayProps,
  generateInterval,
  CalendarProps
} from '../../components/Calendar'
import { useNavigation } from '@react-navigation/native'

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDates, setMarkedDates] = useState<CalendarProps>(
    {} as CalendarProps
  )

  const navigation = useNavigation()

  const theme = useTheme()

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails')
  }

  function handleBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {'\n'}
          Data de início e {'\n'}
          fim do aluguel{'\n'}
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue selected={false}>18/05/2020</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>
            <S.DateValue selected={false}>18/05/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar
          markedDates={markedDates as any}
          onDayPress={handleChangeDate}
        />
      </S.Content>

      <S.Footer>
        <Button title="confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
