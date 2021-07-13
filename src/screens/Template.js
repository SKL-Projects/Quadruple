import React from "react";
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import BottomSheet from 'reanimated-bottom-sheet'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const SheetContainer = styled.View`
  background: ${({ theme }) => theme.color.white};
  height: 100%;
  padding-top: 20px;
  align-items: center;
`

// const StyledButton = styled(Button)`
//   width: 100px;
//   height: 50px;
//   border-radius: 24px;
//   background: #eceff8;
//   box-shadow:  15px 15px 30px #c4c6ce;
// `

const arr = Array(1000).fill('내용')

const renderHeader = () => {
  <Header>
    <Text>헤더</Text>
  </Header>
}

const renderContent = () => (
  <SheetContainer>
    {arr.map((v, i) => (<Text>{v}{i}</Text>))}
  </SheetContainer>
);


function Template() {
  const sheetRef = React.useRef(null);
  return (
    <Container>
      <Container>
        <Text style={{fontSize: 150}}>지도</Text>
      </Container>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['100%', '50%', '10%']}
        initialSnap={1}
        borderRadius={24}
        renderContent={renderContent}
        enabledBottomInitialAnimation
      />
    </Container>
   );
}

export default Template;
