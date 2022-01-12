import React from 'react'
import { useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import * as S from './styles'
import { ConfirmButton } from '../../components/ConfirmButton'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export function SchedulingComplete() {
  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate('Home')
  }

  const { width } = useWindowDimensions()

  return (
    <S.Container>
      <StatusBar style="light" />
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Carro alugado!</S.Title>

        <S.Message>
          Agora você só precisa ir {'\n'}
          até a concessionãria da RENTX {'\n'}
          pegar o seu autómovel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  )
}
