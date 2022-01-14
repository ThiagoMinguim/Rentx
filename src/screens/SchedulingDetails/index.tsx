import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { useTheme } from 'styled-components'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import * as S from './styles'
import { Button } from '../../components/Button'
import { RFValue } from 'react-native-responsive-fontsize'

import { CarDTO } from '../../dtos/CarDTO'
import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { api } from '../../services/api'
import { Alert } from 'react-native'

interface Params {
  car: CarDTO
  dates: string[]
}

interface RentalPeriod {
  start: string
  end: string
}

type SchedulingProps = NativeStackScreenProps<
  RootStackParamList,
  'SchedulingDetails'
>

export function SchedulingDetails({ navigation, route }: SchedulingProps) {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  )

  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * car.rent.price)

  async function handleConfirm() {
    const schedulesByCar = await api.get(`/schedules/car/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ]

    await api
      .put(`/schedules/car/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailable_dates
      })
      .then(response => {
        navigation.navigate('SchedulingComplete')
      })
      .catch(() => Alert.alert('Erro ao reservar o carro'))
  }

  function handleBack() {
    navigation.goBack()
  }

  const theme = useTheme()

  useEffect(() => {
    setRentalPeriod({
      start: format(new Date(dates[0]), 'dd/MM/yyyy'),
      end: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price} </S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              px
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            px
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>Total</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} díarias`}</S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirm}
          color={theme.colors.sucess}
        />
      </S.Footer>
    </S.Container>
  )
}
