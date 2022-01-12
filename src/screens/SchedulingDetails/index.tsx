import React from 'react'
import { Feather } from '@expo/vector-icons'

import { useTheme } from 'styled-components'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

import * as S from './styles'
import { Button } from '../../components/Button'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'

export function SchedulingDetails() {
  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete')
  }

  const theme = useTheme()

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={[
            'https://e7.pngegg.com/pngimages/895/775/png-clipart-2010-audi-a5-car-audi-coupe-gt-2011-audi-a5-audi-sedan-car-thumbnail.png'
          ]}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 560</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          <Accessory name="380km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 hp" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />

          <S.RentalPeriod>
            <S.CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                px
                color={theme.colors.shape}
              />
            </S.CalendarIcon>

            <S.DateInfo>
              <S.DateTitle>De</S.DateTitle>
              <S.DateValue>18/06/2021</S.DateValue>
            </S.DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              px
              color={theme.colors.text}
            />

            <S.DateInfo>
              <S.DateTitle>De</S.DateTitle>
              <S.DateValue>18/06/2021</S.DateValue>
            </S.DateInfo>
          </S.RentalPeriod>

          <S.RentalPrice>
            <S.RentalPriceLabel>Total</S.RentalPriceLabel>
            <S.RentalPriceDetails>
              <S.RentalPriceQuota>R$ 560 x3 díarias</S.RentalPriceQuota>
              <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
            </S.RentalPriceDetails>
          </S.RentalPrice>
        </S.Acessories>
      </S.Content>
      
      <S.Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirmRental}
          color={theme.colors.sucess}
        />
      </S.Footer>
    </S.Container>
  )
}
