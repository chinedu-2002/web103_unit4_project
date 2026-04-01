const API_URL = '/api/cars'

const getAllCars = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch cars')
  return response.json()
}

const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch car')
  return response.json()
}

const createCar = async (carData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!response.ok) throw new Error('Failed to create car')
  return response.json()
}

const updateCar = async (id, carData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!response.ok) throw new Error('Failed to update car')
  return response.json()
}

const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to delete car')
  return response.json()
}

export { getAllCars, getCar, createCar, updateCar, deleteCar }
