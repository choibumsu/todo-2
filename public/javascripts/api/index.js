const baseUrl = 'http://localhost:3000/api'
const METHOD = {
  GET() {
    return {
      method: 'GET',
    }
  },
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  },
}

export const fetchColumn = async () => {
  const response = await fetch('/column')
  if (response.status === 200) {
    const datas = await response.json()
    return datas
  }

  if (response.status === 404) {
    throw 'Column Not Found'
  }
  if (response.status >= 500) {
    throw 'Server Error'
  }
}

export const fetchCard = async () => {
  const response = await fetch('/card')
  if (response.status === 200) {
    const datas = await response.json()
    return datas
  }
  if (response.status === 404) {
    throw 'Card Not Found'
  }
  if (response.status >= 500) {
    throw 'Server Error'
  }
}

export const updateColumnTitle = async (data) => {
  fetch('/column', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
}

export const updateCardTitle = async (data) => {
  fetch('/card', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
}

export const deleteCard = async (data) => {
  fetch('/card', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
}

export const createCardApi = async (newCardData) => {
  const response = await fetch(
    `${baseUrl}/create/card`,
    METHOD.POST(newCardData)
  )

  // 에러 처리

  const datas = await response.json()
  return datas
}
