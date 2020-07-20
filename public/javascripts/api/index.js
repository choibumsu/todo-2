export const fetchColumn = async () => {
  const response = await fetch('/column')
  if (response.status === 404) {
    console.log(404)
  }
  if (response.status !== 200) {
    return
  }
  const datas = await response.json()
  return datas
}

export const fetchCard = async () => {
  const response = await fetch('/card')
  if (response.status === 404) {
    console.log(404)
  }
  if (response.status !== 200) {
    return
  }
  const datas = await response.json()
  return datas
}
