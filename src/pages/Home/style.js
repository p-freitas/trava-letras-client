import styled from 'styled-components'

export const AlphabetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  position: relative;
  width: 100%;
  max-width: 75%;
  margin: 0 auto;
`

export const Letter = styled.div`
  width: 100px;
  height: 80px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  cursor: ${({ cursor }) => cursor ? 'default' : 'pointer'};
  color: white;
  margin: 20px;
  background-color: ${({ background }) => background};

  &:hover {
    background-color: ${({ backgroundHover }) => backgroundHover};
  }
`

export const PageContainer = styled.div`
  background-color: #2563eb;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-evenly;
`

export const TabletopContainer = styled.div`
  background-color: #2563eb;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-evenly;
  width: 85%;
`

export const ScoreBoardContainer = styled.div`
  background-color: #2563eb;
  display: flex;
  width: 20%;
`

export const Button = styled.button`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: red;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: 3px solid black;
  box-shadow: black 0 0 10px 0px;

  &:hover {
    opacity: 0.8;
  }
`

export const ButtonContainer = styled.div`
  width: 30%;
  text-align: center;
`

export const TimerText = styled.h1`
  text-align: center;
  color: white;
  font-size: 50px;
`

export const TextLost = styled.h1`
  position: absolute;
  z-index: 1;
  font-size: 179px;
  color: red;
`

export const ResetButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 7%;
  background-color: red;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: black 0px 0px 2px 0px;

  &:hover {
    opacity: 0.8;
  }
`

export const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 60px;
`
