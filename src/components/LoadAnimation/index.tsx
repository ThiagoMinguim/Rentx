import React from 'react'
import LottieView from 'lottie-react-native'

import load_car from '../../assets/load_car.json'

import * as S from './styles'

export function LoadAnimation() {
  return (
    <S.Container>
      <LottieView
        source={load_car}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </S.Container>
  )
}
