import React from 'react'
import { useTheme } from 'styled-components'
import { BackButton } from '../../components/BackButton'

import ArrowSvg from '../../assets/arrow.svg'

import * as S from './styles'
import { StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'

export function Scheduling() {
  const theme = useTheme()

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <S.Title>
          Escolha uma {'\n'}
          Data de início e {'\n'}
          fim do aluguel{'\n'}
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>De</S.DateTitle>
            <S.DateValue selected={false}>18/05/2020</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>Até</S.DateTitle>
            <S.DateValue selected={false}>18/05/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="confirmar" />
      </S.Footer>
    </S.Container>
  )
}
