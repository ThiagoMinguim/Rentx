import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import * as S from './styles'
import { Button } from '../../components/Button'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useRoute } from '@react-navigation/native'

import { CarDTO } from '../../dtos/CarDTO'
import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface Params {
  car: CarDTO
}

type CarDetailsProps = NativeStackScreenProps<RootStackParamList, 'CarDetails'>

export function CarDetails({ navigation, route }: CarDetailsProps) {
  const { car } = route.params as Params

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <S.Container>
      <StatusBar />
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
            <S.Price>{car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Acessories>

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  )
}
