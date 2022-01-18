import React, { useRef, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'

import * as S from './styles'

interface Props {
  imagesUrl: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setImageIndex(index)
  })

  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((_, index) => (
          <S.ImageIndex key={String(index)} active={index === imageIndex} />
        ))}
      </S.ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <S.CardImageWrapper>
            <S.CardImage source={{ uri: item }} />
          </S.CardImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  )
}
