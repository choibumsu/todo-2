export const fetchTest = async () => {
  const response = await fetch(`http://localhost:3000/test`)

  if (response.status === 404) {
    console.log(404)
  }

  if (response.status !== 200) {
    return
  }

  const datas = await response.json()
  console.log(response)
  console.log(datas)
  return datas
}
