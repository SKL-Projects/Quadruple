import React from "react";
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import BottomDrawer from '../components/elements/BottomDrawer'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

// const SheetContainer = styled.ScrollView`
//   background: ${({ theme }) => theme.color.white};
//   height: 100%;
//   padding-top: 20px;
//   align-items: center;
// `

const Shee = styled.View``

const SheetContainer = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})``

// const StyledButton = styled(Button)`
//   width: 100px;
//   height: 50px;
//   border-radius: 24px;
//   background: #eceff8;
//   box-shadow:  15px 15px 30px #c4c6ce;
// `

const arr = Array(1000).fill('내용')


export default function Template() {
  return (
    <Container>
      <Container>
        <Text style={{fontSize: 150}}>지도</Text>
      </Container>
      <BottomDrawer>
        <Container>
          {arr.map((v, i) => (<Text>{v}{i}</Text>))}
        </Container>
      </BottomDrawer>
    </Container>
   );
}