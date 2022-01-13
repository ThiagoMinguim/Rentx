import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { CarDTO } from '../../dtos/CarDTO'

import * as S from './styles'

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

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
      {loading ? (
        <Load />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={handleCarDetails} />
          )}
        />
      )}
    </S.Container>
  )
}
