import React from 'react'
import CarPreview from './CarPreview'
import { CAR_OPTIONS, calculatePrice, formatPrice } from '../utilities/calcPrice'
import '../css/Cars.css'

const DEFAULT_SELECTIONS = {
  name: '',
  convertible: false,
  exterior: 'Midnight Black',
  roof: 'Standard',
  wheels: 'Standard 18"',
  interior: 'Standard Cloth',
}

const CarForm = ({ initialValues = DEFAULT_SELECTIONS, onSubmit, submitLabel = 'Create Car', error = '' }) => {
  const [form, setForm] = React.useState({ ...DEFAULT_SELECTIONS, ...initialValues })

  // Keep in sync if initialValues changes (e.g. edit page loads data)
  React.useEffect(() => {
    setForm({ ...DEFAULT_SELECTIONS, ...initialValues })
  }, [initialValues.name, initialValues.exterior, initialValues.roof, initialValues.wheels, initialValues.interior, initialValues.convertible])

  const totalPrice = calculatePrice(form)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, total_price: totalPrice })
  }

  return (
    <div className="car-form-layout">
      {/* Preview panel */}
      <div className="car-form-preview">
        <CarPreview
          exterior={form.exterior}
          roof={form.roof}
          wheels={form.wheels}
          interior={form.interior}
          convertible={form.convertible}
        />
        <div className="price-badge">
          💰 {formatPrice(totalPrice)}
        </div>
      </div>

      {/* Form panel */}
      <form className="car-form-fields" onSubmit={handleSubmit}>
        {/* Car name */}
        <div className="form-group">
          <label>Car Name</label>
          <input
            type="text"
            placeholder="My Dream Car"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>

        {/* Convertible */}
        <div className="form-group form-group-checkbox">
          <label>
            <input
              type="checkbox"
              checked={form.convertible}
              onChange={e => setForm(f => ({ ...f, convertible: e.target.checked }))}
            />
            &nbsp; Convertible (+$8,000)
          </label>
        </div>

        {/* Exterior */}
        <div className="form-group">
          <label>Exterior Color</label>
          <div className="option-swatches">
            {CAR_OPTIONS.exterior.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`color-swatch ${form.exterior === opt.value ? 'selected' : ''}`}
                style={{ background: opt.color }}
                title={`${opt.name} ${opt.price > 0 ? `+$${opt.price.toLocaleString()}` : '(included)'}`}
                onClick={() => setForm(f => ({ ...f, exterior: opt.value }))}
              >
                {form.exterior === opt.value && <span className="swatch-check">✓</span>}
              </button>
            ))}
          </div>
          <div className="option-label">
            {CAR_OPTIONS.exterior.find(o => o.value === form.exterior)?.name}
            {' — '}
            {CAR_OPTIONS.exterior.find(o => o.value === form.exterior)?.price > 0
              ? `+$${CAR_OPTIONS.exterior.find(o => o.value === form.exterior)?.price.toLocaleString()}`
              : 'Included'}
          </div>
        </div>

        {/* Roof */}
        <div className="form-group">
          <label>Roof Type</label>
          <div className="option-buttons">
            {CAR_OPTIONS.roof.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`option-btn ${form.roof === opt.value ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, roof: opt.value }))}
              >
                {opt.name}
                <span className="option-price">
                  {opt.price > 0 ? `+$${opt.price.toLocaleString()}` : 'Incl.'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Wheels */}
        <div className="form-group">
          <label>Wheels</label>
          <div className="option-buttons">
            {CAR_OPTIONS.wheels.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`option-btn ${form.wheels === opt.value ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, wheels: opt.value }))}
              >
                {opt.name}
                <span className="option-price">
                  {opt.price > 0 ? `+$${opt.price.toLocaleString()}` : 'Incl.'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interior */}
        <div className="form-group">
          <label>Interior</label>
          <div className="option-buttons">
            {CAR_OPTIONS.interior.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`option-btn ${form.interior === opt.value ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, interior: opt.value }))}
              >
                {opt.name}
                <span className="option-price">
                  {opt.price > 0 ? `+$${opt.price.toLocaleString()}` : 'Incl.'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="submit-btn">{submitLabel}</button>
      </form>
    </div>
  )
}

export default CarForm
