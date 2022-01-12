import React from 'react'
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
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

export function CarDetails() {
  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate('Scheduling')
  }

  return (
    <S.Container>
      <StatusBar />
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
        </S.Acessories>

        <S.About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rem
          labore sunt eum, commodi, velit ducimus vero, corporis veniam quam
          ratione impedit nihil. Quisquam dicta temporibus doloribus,laborum.
        </S.About>

        <S.About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rem
          labore sunt eum, commodi, velit ducimus vero, corporis veniam quam
          ratione impedit nihil. Quisquam dicta temporibus doloribus,laborum.
        </S.About>

        <S.About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rem
          labore sunt eum, commodi, velit ducimus vero, corporis veniam quam
          ratione impedit nihil. Quisquam dicta temporibus doloribus,laborum.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  )
}
