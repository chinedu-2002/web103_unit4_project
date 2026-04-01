import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcPrice'
import '../css/Cars.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAllCars()
      .then(setCars)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this car? This cannot be undone.')) return
    try {
      await deleteCar(id)
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      alert('Failed to delete car.')
    }
  }

  if (loading) return <div className="loading">Loading your garage...</div>

  return (
    <main>
      <div className="page-container">
        <h1>My Garage</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          {cars.length} custom {cars.length === 1 ? 'car' : 'cars'} saved
        </p>

        {cars.length === 0 ? (
          <div className="empty-state">
            <h2>No cars yet</h2>
            <p>Head over to <Link to="/">Customize</Link> to build your first car!</p>
          </div>
        ) : (
          <div className="cars-grid">
            {cars.map(car => (
              <div key={car.id} className="car-card">
                <h3>{car.name}</h3>
                <div className="car-card-details">
                  <span>🎨 {car.exterior}</span>
                  <span>🏠 {car.roof} Roof</span>
                  <span>🔧 {car.wheels}</span>
                  <span>💺 {car.interior}</span>
                  {car.convertible && <span>🌬️ Convertible</span>}
                </div>
                <div className="car-card-price">{formatPrice(car.total_price)}</div>
                <div className="car-card-actions">
                  <Link to={`/customcars/${car.id}`} className="btn-view">View</Link>
                  <button className="btn-edit" onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default ViewCars
