import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../css/Cars.css'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCar(id)
      .then(setCar)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${car.name}"? This cannot be undone.`)) return
    try {
      await deleteCar(id)
      navigate('/customcars')
    } catch (err) {
      alert('Failed to delete car.')
    }
  }

  if (loading) return <div className="loading">Loading car details...</div>
  if (!car) return <div className="loading">Car not found.</div>

  return (
    <main>
      <div className="page-container">
        <div className="details-layout">
          {/* Preview */}
          <div style={{ flex: '1 1 50%' }}>
            <CarPreview
              exterior={car.exterior}
              roof={car.roof}
              wheels={car.wheels}
              interior={car.interior}
              convertible={car.convertible}
            />
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <div className="price-badge">{formatPrice(car.total_price)}</div>
            </div>
          </div>

          {/* Info */}
          <div className="details-info">
            <h1>{car.name}</h1>

            <table className="details-table">
              <tbody>
                <tr>
                  <th>Exterior</th>
                  <td>{car.exterior}</td>
                </tr>
                <tr>
                  <th>Roof</th>
                  <td>{car.roof}</td>
                </tr>
                <tr>
                  <th>Wheels</th>
                  <td>{car.wheels}</td>
                </tr>
                <tr>
                  <th>Interior</th>
                  <td>{car.interior}</td>
                </tr>
                <tr>
                  <th>Convertible</th>
                  <td>{car.convertible ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>

            <div className="details-actions">
              <button className="btn-edit" onClick={() => navigate(`/edit/${car.id}`)}>Edit Car</button>
              <button className="btn-delete" onClick={handleDelete}>Delete Car</button>
              <button className="btn-view" onClick={() => navigate('/customcars')}>← Back to Garage</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CarDetails
