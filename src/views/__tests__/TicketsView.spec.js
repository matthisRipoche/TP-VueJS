import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicketsView from '../TicketsView.vue'
import ticketService from '@/api/services/ticketService'

// Mock the service
vi.mock('@/api/services/ticketService', () => ({
  default: {
    getAllTickets: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    deleteTicket: vi.fn(),
    clearAllTickets: vi.fn()
  }
}))

describe('TicketsView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loader while fetching data', async () => {
    // Return a promise that doesn't resolve immediately
    ticketService.getAllTickets.mockReturnValue(new Promise(() => {}))
    
    const wrapper = mount(TicketsView, {
      global: {
        stubs: {
          'Dialog': true,
          'DialogContent': true,
          'DialogTrigger': true,
          'DialogHeader': true,
          'DialogTitle': true,
          'DialogDescription': true,
          'TicketForm': true,
          'Loader2': true,
          'Plus': true,
          'Trash2': true
        }
      }
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows empty state when no tickets are returned', async () => {
    ticketService.getAllTickets.mockResolvedValue([])
    
    const wrapper = mount(TicketsView, {
      global: {
        stubs: {
          'Dialog': true,
          'DialogContent': true,
          'DialogTrigger': true,
          'DialogHeader': true,
          'DialogTitle': true,
          'DialogDescription': true,
          'TicketForm': true,
          'Plus': true,
          'Trash2': true
        }
      }
    })

    // Wait for the mounted loadResults to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('No tickets found.')
  })

  it('renders tickets list when data is fetched', async () => {
    const mockTickets = [
      { id: 1, title: 'Bug 1', responsable: 'Alice', description: 'Help' }
    ]
    ticketService.getAllTickets.mockResolvedValue(mockTickets)
    
    const wrapper = mount(TicketsView, {
      global: {
        stubs: {
          'Dialog': true,
          'DialogContent': true,
          'DialogTrigger': true,
          'DialogHeader': true,
          'DialogTitle': true,
          'DialogDescription': true,
          'TicketForm': true,
          'User': true,
          'Pencil': true,
          'Trash2': true,
          'Plus': true
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Bug 1')
    expect(wrapper.text()).toContain('Alice')
  })

  it('displays error message when API fails', async () => {
    ticketService.getAllTickets.mockRejectedValue(new Error('API Failure'))
    
    const wrapper = mount(TicketsView, {
      global: {
        stubs: {
          'Dialog': true,
          'DialogContent': true,
          'DialogTrigger': true,
          'DialogHeader': true,
          'DialogTitle': true,
          'DialogDescription': true,
          'TicketForm': true,
          'Plus': true,
          'Trash2': true
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Failed to load tickets')
  })
})
