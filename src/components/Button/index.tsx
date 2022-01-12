import React from 'react'

import * as S from './styles'

interface Props {
  title: string
  color?: string
  onPress?: () => void
}

export function Button({ title, color, onPress, ...rest }: Props) {
  return (
    <S.Container {...rest} color={color} onPress={onPress}>
      <S.Title> {title} </S.Title>
    </S.Container>
  )
}
