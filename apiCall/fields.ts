export const getFields = async () => {
  try {
    const url = 'https://ulventech-react-exam.netlify.app/api/form'
    const response = await fetch(url)
    const { data } = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export const postFields = async (body: any) => {
  try {
    const url = 'https://ulventech-react-exam.netlify.app/api/form'
    const response: any = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const { data } = await response.json()
    return data
  } catch (error) {
    return null
  }
}
