import React from "react";
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '@ant-design/react-native'
import BottomSheet from 'reanimated-bottom-sheet'

const Container = styled.View`
  height: 100%;
`

const Header = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.color.white};
  align-items: center;
`

// const ChildrenContainer = styled.ScrollView`
//   flex: 7;
//   background: #aaa;
//   height: 450px;
// `

const Children = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})`
  flex: 7;
  background: #aaa;
  height: 50%;
`

const arr = Array(1000).fill('내용')

export default function BottomDrawer({ children }) {
  const sheetRef = React.useRef(null)

  const renderContent = () => (
    <Container>
      <Header>
        <Text>ㅋㅋㄹㅃㅃ</Text>
      </Header>
      {/* <Children>
        {children}
      </Children> */}
      <FlatList
        data={arr}
        renderItem={({ i, index }) => (
          <Text>{i} {index}</Text>
        )}
      />
    </Container>
  )

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['100%', '50%', '15%']}
      initialSnap={1}
      borderRadius={24}
      renderContent={renderContent}
      enabledBottomInitialAnimation
      enabledInnerScrolling
      enabledContentGestureInteraction={false}
    />
   );
}