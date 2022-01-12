import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car'

import * as S from './styles'

export function Home() {
  const navigation = useNavigation()

  const carData = {
    brand: 'Fiat',
    name: 'Uno',
    rent: {
      period: 'Diária',
      price: 50
    },
    thumbnail:
      'https://e7.pngegg.com/pngimages/895/775/png-clipart-2010-audi-a5-car-audi-coupe-gt-2011-audi-a5-audi-sedan-car-thumbnail.png'
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

  return (
    <S.Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <S.TotalCars>total de 12 carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>
      <S.CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={() => <Car data={carData} onPress={handleCarDetails} />}
      />
    </S.Container>
  )
}
