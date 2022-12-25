import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('render h1', () => {
    render(<App />)
    const h1Element = screen.getByRole('heading', {
      name: 'Hello World',
    })
    expect(h1Element).toBeInTheDocument()
  })

  const buttonElement = screen.getByRole('button', {
    name: 'Hello World',
  })
  expect(buttonElement).not.toBeEnabled()
})
