import React from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import Tree from '..'

afterEach(cleanup)

describe('React Tree core functions', () => {
  it('Renders a message when there is no data', async () => {
    const { container } = render(<Tree nodes={[]} />)
    expect(container).toMatchSnapshot()
    const message = await screen.findByText(/No Data 😔/i)
    expect(message).toBeTruthy()
  })

  it('Renders a loader and nothing else when `isLoading` state is `true`', async () => {
    const { container } = render(<Tree isLoading nodes={[]} />)
    expect(container).toMatchSnapshot()
    const message = await screen.findByText(/Loading/i)
    expect(message).toBeTruthy()
  })

  it('Re-renders nodes when the data set changes', async () => {
    const { rerender } = render(<Tree nodes={[{ id: 1, parentId: null, label: 'TEST_NODE_1' }]} />)
    const firstRender = await screen.findByText(/TEST_NODE_1/)
    expect(firstRender).toBeTruthy()
    rerender(<Tree nodes={[{ id: 2, parentId: null, label: 'TEST_NODE_2' }]} />)
    const secondRender = await screen.findByText(/TEST_NODE_2/)
    expect(secondRender).toBeTruthy()
  })
})
