import Board from './components/Board'
import ActivityCard from './components/ActivityCard'
import './components/Header'
import './components/SideBar'
import '../stylesheets/common/base.scss'

import { fetchActivityCard } from './api/index'

async function getActivityCard() {
  try {
    const allCardActivitys = await fetchActivityCard()

    allCardActivitys.forEach((cardActivity) => {
      new ActivityCard(cardActivity)
    })
  } catch (e) {
    console.log(e)
  }
}

new Board()
getActivityCard()
