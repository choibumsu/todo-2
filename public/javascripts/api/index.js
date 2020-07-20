export const fetchColumn = async () => {
  const response = await fetch('http://localhost:3001/column')
  if (response.status === 404) {
    console.log(404)
  }
  if (response.status !== 200) {
    return
  }
  const datas = await response.json()
  return datas
}
