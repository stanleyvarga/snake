import React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import {
  $gameCollisionStateStore,
  $userInGameStore,
  $showAIPathToTargetStore,
  $indexesVisibleStore,
  onSetCollisionState,
  onAddUserToGame,
  onRemoveUserFromGame,
  onSetAiPathVisibleToTarget,
  onSetIndexesVisible,
} from '../model'
import { Title, Checkbox } from './common'

export const Wrapper = styled.ul`
  margin: 0;
  padding: 0;
`

export const SettingWrapper = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex: 1 1 auto;
  margin-bottom: 5px;
  user-select: none;
`

export const Name = styled.label`
  font-size: 16px;
  text-align: left;
  flex: 1 1 auto;
  cursor: pointer;
`

export function Settings() {
  const collisionState = useStore($gameCollisionStateStore)
  const userInGameStore = useStore($userInGameStore)
  const showAIPathToTargetStore = useStore($showAIPathToTargetStore)
  const indexesVisibleStore = useStore($indexesVisibleStore)

  function onSetCollision() {
    onSetCollisionState(!collisionState)
  }

  function onSetAiPathVisible() {
    onSetAiPathVisibleToTarget(!showAIPathToTargetStore)
  }

  function onSetIndexesVisibleState() {
    onSetIndexesVisible(!indexesVisibleStore)
  }

  function handleChangeUserInGameState() {
    if (userInGameStore) {
      onRemoveUserFromGame()
    } else {
      onAddUserToGame()
    }
  }

  return (
    <>
      <Title>Settings</Title>
      <Wrapper>
        <SettingWrapper>
          <Checkbox
            id="collision"
            checked={collisionState}
            onChange={onSetCollision}
          />
          <Name htmlFor="collision">handle collision state</Name>
        </SettingWrapper>
        <SettingWrapper>
          <Checkbox
            id="withUser"
            checked={userInGameStore}
            onChange={handleChangeUserInGameState}
          />
          <Name htmlFor="withUser">add user (you) to game</Name>
        </SettingWrapper>
        <SettingWrapper>
          <Checkbox
            id="path"
            checked={showAIPathToTargetStore}
            onChange={onSetAiPathVisible}
          />
          <Name htmlFor="path">show ai path to target</Name>
        </SettingWrapper>
        <SettingWrapper>
          <Checkbox
            id="indexesvisible"
            checked={indexesVisibleStore}
            onChange={onSetIndexesVisibleState}
          />
          <Name htmlFor="indexesvisible">visible indexes</Name>
        </SettingWrapper>
      </Wrapper>
    </>
  )
}
