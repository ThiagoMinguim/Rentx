import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BackButton } from '../../components/BackButton'
import { AntDesign } from '@expo/vector-icons'
import { Car } from '../../components/Car'

import { CarDTO } from '../../dtos/CarDTO'
import { RootStackParamList } from '../../routes/stack.routes'
import { api } from '../../services/api'
import theme from '../../styles/theme'

import * as S from './styles'

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
}

type SchedulingProps = NativeStackScreenProps<RootStackParamList, 'MyCars'>

export function MyCars({ navigation }: SchedulingProps) {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1')
        console.log(response.data)

        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [])

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
          Seus agendamentos,{'\n'}
          estão aqui. {'\n'}
        </S.Title>
        <S.SubTItle>Conforto, segurança e praticidade.</S.SubTItle>
      </S.Header>
      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>05</S.AppointmentsQuantity>
        </S.Appointments>

        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.CarWrapper>
              <Car data={item.car} />
              <S.CarFooter>
                <S.CarFooterTitle>Período</S.CarFooterTitle>
                <S.CarFooterPeriod>
                  <S.CarFooterDate>18/06/2021</S.CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{ marginHorizontal: 10 }}
                  />
                  <S.CarFooterDate>20/06/2021</S.CarFooterDate>
                </S.CarFooterPeriod>
              </S.CarFooter>
            </S.CarWrapper>
          )}
        />
      </S.Content>
    </S.Container>
  )
}
