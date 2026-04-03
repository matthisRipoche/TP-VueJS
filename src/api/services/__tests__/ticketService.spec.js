import { describe, it, expect, vi, beforeEach } from 'vitest'
import ticketService from '../ticketService'
import apiClient from '../../client'

vi.mock('../../client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('ticketService.js', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAllTickets returns reversed data on success', async () => {
    const mockData = [{ id: 1, title: 'Test 1' }, { id: 2, title: 'Test 2' }]
    apiClient.get.mockResolvedValueOnce({ data: mockData })

    const result = await ticketService.getAllTickets()
    
    expect(result).toEqual([{ id: 2, title: 'Test 2' }, { id: 1, title: 'Test 1' }])
    expect(apiClient.get).toHaveBeenCalledWith('/todos')
  })

  it('getAllTickets handles API error', async () => {
    const mockError = new Error('Network Error')
    apiClient.get.mockRejectedValueOnce(mockError)

    await expect(ticketService.getAllTickets()).rejects.toThrow('Network Error')
  })

  it('createTicket calls correct endpoint and returns data', async () => {
    const mockTicket = { title: 'New' }
    apiClient.post.mockResolvedValueOnce({ data: { id: 1, ...mockTicket } })

    const result = await ticketService.createTicket(mockTicket)
    
    expect(result.id).toBe(1)
    expect(apiClient.post).toHaveBeenCalledWith('/todos', mockTicket)
  })

  it('createTicket handles API failure', async () => {
    apiClient.post.mockRejectedValueOnce(new Error('Failed to create'))

    await expect(ticketService.createTicket({})).rejects.toThrow('Failed to create')
  })
})
