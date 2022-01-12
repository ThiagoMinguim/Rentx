import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  color?: string
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;

  padding: 19px
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};
`

export const Title = styled.Text`
  font-family: ${props => props.theme.font.primary_500};
  font-size:${RFValue(15)}px
  color: ${props => props.theme.colors.shape};
`
