import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import { validateCarSelections } from '../utilities/validation'
import '../css/Cars.css'

const CreateCar = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    const validation = validateCarSelections(formData)
    if (!validation.valid) {
      setError(validation.message)
      return
    }
    setError('')
    try {
      await createCar(formData)
      navigate('/customcars')
    } catch (err) {
      setError('Failed to save car. Please try again.')
    }
  }

  return (
    <main>
      <div className="page-container">
        <h1>Customize Your Car</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
          Build your dream car — choose your options and save it to your garage.
        </p>
        <CarForm onSubmit={handleSubmit} submitLabel="CREATE CAR" error={error} />
      </div>
    </main>
  )
}

export default CreateCar
