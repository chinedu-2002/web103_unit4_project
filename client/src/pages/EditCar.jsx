import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'
import { validateCarSelections } from '../utilities/validation'
import '../css/Cars.css'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCar(id)
      .then(car => setInitialValues({
        name: car.name,
        convertible: car.convertible,
        exterior: car.exterior,
        roof: car.roof,
        wheels: car.wheels,
        interior: car.interior,
      }))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (formData) => {
    const validation = validateCarSelections(formData)
    if (!validation.valid) {
      setError(validation.message)
      return
    }
    setError('')
    try {
      await updateCar(id, formData)
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError('Failed to update car. Please try again.')
    }
  }

  if (loading) return <div className="loading">Loading car...</div>
  if (!initialValues) return <div className="loading">Car not found.</div>

  return (
    <main>
      <div className="page-container">
        <h1>Edit Car</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
          Update your car's configuration below.
        </p>
        <CarForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel="SAVE CHANGES"
          error={error}
        />
      </div>
    </main>
  )
}

export default EditCar
