import React from 'react'
import { ActivityIndicator } from 'react-native'
import { TouchableOpacityProps } from 'react-native'
import theme from '../../styles/theme'

import * as S from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  color?: string
  onPress?: () => void
  disabled?: boolean
  loading?: boolean
}

export function Button({
  title,
  color,
  onPress,
  disabled = false,
  loading = false
}: Props) {
  return (
    <S.Container
      color={color}
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: disabled === true || loading === true ? 0.5 : 1 }}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <S.Title> {title} </S.Title>
      )}
    </S.Container>
  )
}
