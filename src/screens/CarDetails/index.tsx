import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import * as S from './styles'

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

import { Button } from '../../components/Button'
import { StatusBar } from 'expo-status-bar'

import { CarDTO } from '../../dtos/CarDTO'
import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

interface Params {
  car: CarDTO
}

type CarDetailsProps = NativeStackScreenProps<RootStackParamList, 'CarDetails'>

export function CarDetails({ navigation, route }: CarDetailsProps) {
  const { car } = route.params as Params

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
    console.log(event.contentOffset.y)
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
    }
  })

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <S.Container>
      <StatusBar />

      <Animated.View style={[headerStyleAnimation]}>
        <S.Header>
          <BackButton onPress={handleBack} />
        </S.Header>

        <S.CarImages>
          <ImageSlider imagesUrl={car.photos} />
        </S.CarImages>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight(),
          alignItems: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}>
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
        <S.About>{car.about}</S.About>
        <S.About>{car.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  )
}
