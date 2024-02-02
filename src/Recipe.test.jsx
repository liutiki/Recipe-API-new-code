import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Recipe from './Recipe'
import { avocadoRecipe } from './fixtures'

describe('Recipe', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Recipe recipe={avocadoRecipe} />)

    // Check if the label is rendered
    expect(getByText('Avocado Toast')).toBeInTheDocument()

    // Check if the image is rendered with the correct alt text
    const image = getByAltText('avocado')
    expect(image).toBeInTheDocument()
    expect(image.src).toContain('path/to/avocado.png')

    // Check if ingredients are rendered
    expect(getByText('Avocado : 1')).toBeInTheDocument()
    expect(getByText('Bread : 2 slices')).toBeInTheDocument()

    // Check if instructions are rendered
    avocadoRecipe.instructions.forEach(instruction => {
      expect(getByText(instruction)).toBeInTheDocument()
    })
  })
})
