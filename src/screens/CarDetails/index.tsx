import React from 'react'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import * as S from './styles'

export function CarDetails() {
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

        <S.About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rem
          labore sunt eum, commodi, velit ducimus vero, corporis veniam quam
          ratione impedit nihil. Quisquam dicta temporibus doloribus,laborum.
        </S.About>
      </S.Content>
    </S.Container>
  )
}
