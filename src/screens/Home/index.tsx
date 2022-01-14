import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { CarDTO } from '../../dtos/CarDTO'

import * as S from './styles'
import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Home = NativeStackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation }: Home) {
  const theme = useTheme()
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
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
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <S.MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </S.MyCarsButton>
    </S.Container>
  )
}
