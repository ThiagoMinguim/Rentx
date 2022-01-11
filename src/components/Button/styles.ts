import styled from 'styled-components/native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

interface ButtonProps extends RectButtonProps {
  color?: string
}

export const Container = styled(RectButton)<ButtonProps>`
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
