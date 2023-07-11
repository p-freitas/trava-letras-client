import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ModalTutorial from '../../components/ModalTutorial'
import ModalRoomConfigs from '../../components/ModalRoomConfigs'
import ModalBugsReport from '../../components/ModalBugsReport'
import HelpButton from '../../components/HelpButton'
import InstagramIcon from '../../assets/icons/InstagramIcon'
import TwitterIcon from '../../assets/icons/TwitterIcon'
import TiktokIcon from '../../assets/icons/TiktokIcon'
import DiscordIcon from '../../assets/icons/DiscordIcon'
import { ReactComponent as BrazilIcon } from '../../assets/icons/br.svg'
import { ReactComponent as USAIcon } from '../../assets/icons/us.svg'
import { ReactComponent as SpainIcon } from '../../assets/icons/es.svg'
import * as S from './styles'

const Lobby = ({ setLang }) => {
  const navigate = useNavigate()
  const socketRef = useRef(null)
  const { t } = useTranslation()

  const [room, setRoom] = useState('')
  const [openModalTutorial, setOpenModalTutorial] = useState(false)
  const [openModalRoomConfigs, setOpenModalRoomConfigs] = useState(false)
  const [openModalBugsReport, setOpenModalBugsReport] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timerSelectValue, setTimerSelectValue] = useState()
  const [roundsSelectValue, setRoundsSelectValue] = useState()
  const [defaultThemesButtonClick, setDefaultThemesButtonClick] = useState(true)
  const [customThemesButtonClick, setCustomThemesButtonClick] = useState(false)
  const [themesList, setThemesList] = useState([
    `${t('Países')}`,
    `${t('Frutas')}`,
    `${t('Animais')}`,
    `${t('Objetos')}`,
    `${t('Cores')}`,
    `${t('Adjetivos')}`,
    `${t('Partes do corpo humano')}`,
    `${t('Seres mitológicos')}`,
  ])

  useEffect(() => {
    if (localStorage.getItem('firstTime') === null) {
      setOpenModalTutorial(true)
      localStorage.setItem('firstTime', true)
    }
  }, [])

  const handleJoinRoomButton = () => {
    navigate(`/room/${room}`)
    setLoading(true)
  }

  const handleJoinRoom = roomId => {
    navigate(`/room/${roomId}`)
  }

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
      transports: ['websocket'],
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    socketRef.current.on('roomCreated', roomId => {
      handleJoinRoom(roomId)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateRoomButton = letters => {
    socketRef.current.emit(
      'createRoom',
      timerSelectValue?.value !== undefined ? timerSelectValue?.value : 10,
      roundsSelectValue?.value !== undefined ? roundsSelectValue?.value : 3,
      letters,
      defaultThemesButtonClick,
      customThemesButtonClick,
      customThemesButtonClick ? themesList : null
    )
    setLoading(true)
  }

  const handleRoomNameChange = event => {
    if (event.target.value.length <= 6) {
      setRoom(event.target.value.toUpperCase())
    }
  }

  const handleFlagsClick = flag => {
    setLang(flag)
    localStorage.setItem('i18nextLng', flag)
  }

  return (
    <S.PageContainer>
      <S.LoadingOverlay loading={loading}>
        <S.Spinner loading={loading} />
        <S.HeaderContainer>
          <S.Title>WORDOPIA</S.Title>
          <S.FlagsContainer>
            <BrazilIcon onClick={() => handleFlagsClick('pt-BR')} />
            <USAIcon onClick={() => handleFlagsClick('en')} />
            <SpainIcon onClick={() => handleFlagsClick('es')} />
          </S.FlagsContainer>
        </S.HeaderContainer>
        <S.BodyContainer>
          <S.CreateRoomButton onClick={() => setOpenModalRoomConfigs(true)}>
            {t('CRIAR SALA')}
          </S.CreateRoomButton>
          <S.OrText>{t('ou')}</S.OrText>
          <S.JoinButtonContainer>
            <S.JoinButtonInput
              type='text'
              value={room}
              onChange={e => handleRoomNameChange(e)}
              placeholder={t('Digite o código da sala')}
            />
            <S.JoinButton
              onClick={() => handleJoinRoomButton()}
              disabled={!room}
            >
              {t('ENTRAR NA SALA')}
            </S.JoinButton>
          </S.JoinButtonContainer>
        </S.BodyContainer>
        <ModalTutorial
          setOpen={setOpenModalTutorial}
          open={openModalTutorial}
        />
        <ModalRoomConfigs
          setOpen={setOpenModalRoomConfigs}
          open={openModalRoomConfigs}
          handleCreateRoomButton={handleCreateRoomButton}
          setRoundsSelectValue={setRoundsSelectValue}
          setTimerSelectValue={setTimerSelectValue}
          roundsSelectValue={roundsSelectValue}
          timerSelectValue={timerSelectValue}
          defaultThemesButtonClick={defaultThemesButtonClick}
          setDefaultThemesButtonClick={setDefaultThemesButtonClick}
          customThemesButtonClick={customThemesButtonClick}
          setCustomThemesButtonClick={setCustomThemesButtonClick}
          themesList={themesList}
          setThemesList={setThemesList}
        />
        <ModalBugsReport
          setOpen={setOpenModalBugsReport}
          open={openModalBugsReport}
        />
        <S.IconsContainer>
          <InstagramIcon
            width='35px'
            link={'https://www.instagram.com/wordopia.online/'}
          />
          <TiktokIcon width='30px' link={'https://www.tiktok.com/@wordopia'} />
          <TwitterIcon
            width='35px'
            link={'https://twitter.com/Wordopia_game'}
          />
          <DiscordIcon width='40px' link={'https://discord.gg/Wq4DnYAD2F'} />
        </S.IconsContainer>
        <HelpButton
          setOpen={setOpenModalTutorial}
          open={openModalTutorial}
          setOpenBugsModal={setOpenModalBugsReport}
        />
      </S.LoadingOverlay>
    </S.PageContainer>
  )
}

export default Lobby
