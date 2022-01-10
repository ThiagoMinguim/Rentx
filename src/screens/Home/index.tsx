import React from 'react'
import { StatusBar } from 'react-native'

import * as S from './styles'

export function Home() {
  return (
    <S.Container>
      <StatusBar barStyle={'light-content'} translucent />
      <S.Header></S.Header>
    </S.Container>
  )
}
