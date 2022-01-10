import React from 'react'

import * as S from './styles'

interface Props {
  imagesUrl: string[]
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <S.Container>
      <S.ImageIndexes>
        <S.ImageIndex active={true} />
        <S.ImageIndex active={false} />
        <S.ImageIndex active={false} />
        <S.ImageIndex active={false} />
      </S.ImageIndexes>

      <S.CardImageWrapper>
        <S.CardImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </S.CardImageWrapper>
    </S.Container>
  )
}
