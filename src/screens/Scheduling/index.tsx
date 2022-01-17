import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles'
import { StatusBar, Alert } from 'react-native'
import { Button } from '../../components/Button'
import {
  Calendar,
  DayProps,
  generateInterval,
  CalendarProps
} from '../../components/Calendar'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { CarDTO } from '../../dtos/CarDTO'
import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

interface Params {
  car: CarDTO
}

type SchedulingProps = NativeStackScreenProps<RootStackParamList, 'Scheduling'>

export function Scheduling({ navigation, route }: SchedulingProps) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  )
  const [markedDates, setMarkedDates] = useState<CalendarProps>(
    {} as CalendarProps
  )
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )
  const { car } = route.params as Params

  const theme = useTheme()

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione um período para a locação')
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
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

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    })
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
            <S.DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </S.DateValue>
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
        <Button
          title="confirmar"
          onPress={handleConfirmRental}
          disabled={!rentalPeriod.endFormatted}
        />
      </S.Footer>
    </S.Container>
  )
}
