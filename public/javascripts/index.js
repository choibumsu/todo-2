import Board from './components/Board'
import loginForm from './components/loginForm'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchActivityCard, checkAuthApi } from './api/index'

const checkAuth = async () => {
  const [data, status] = await checkAuthApi()

  if (data) {
    new Board(data)
    getActivityCard()

    return
  } else if (status === 404) {
    return
  }
}

const getActivityCard = async () => {
  try {
    const allCardActivitys = await fetchActivityCard()

    allCardActivitys.forEach((cardActivity) => {
      new ActivityCard(cardActivity)
    })
  } catch (e) {
    console.log(e)
  }
}

const init = async () => {
  await checkAuth()
}
init()
