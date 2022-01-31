import React, { useEffect, useState } from 'react'
import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { PanGestureHandler } from 'react-native-gesture-handler'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity)

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

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive(event) {
      positionX.value = event.translationX
      positionY.value = event.translationY
    },
    onEnd() {}
  })

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  })

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
          <S.TotalCars>{`total de ${cars.length} carros`}</S.TotalCars>
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

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}>
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
