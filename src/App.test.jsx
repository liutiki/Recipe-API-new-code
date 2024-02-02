import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { avocadoResponseData } from './fixtures'
import { act } from 'react-dom/test-utils'

// Mocking the global fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(avocadoResponseData),
  })
)

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear()
  })

  afterEach(() => {
    // Ensure that fetch is always called at least once in each test
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('renders the header correctly', () => {
    render(<App />)
    const headerElement = screen.getByText('Find a recipe')
    expect(headerElement).toBeInTheDocument()
  })

  it('fetches recipes on component mount', async () => {
    render(<App />)

    // Wait for the component to update based on the fetch response
    await waitFor(() => {
      // Example assertion: Check for the presence of a recipe label in the document
      expect(screen.getByText('Salmon Avocado Salad')).toBeInTheDocument()
    })

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=avocado`)
  })

  it('displays "No recipes found" when the search returns no results', async () => {
    // Overriding the fetch mock to return no meals
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ meals: null }),
      })
    )

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('No recipes found')).toBeInTheDocument()
    })
  })
})
