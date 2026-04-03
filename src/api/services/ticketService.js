import apiClient from '../client'

export default {
  async getAllTickets() {
    const response = await apiClient.get('/todos')
    return Array.isArray(response.data) ? response.data.reverse() : []
  },

  async createTicket(data) {
    const response = await apiClient.post('/todos', data)
    return response.data
  },

  async updateTicket(id, data) {
    const response = await apiClient.put(`/todos/${id}`, data)
    return response.data
  },

  async deleteTicket(id) {
    await apiClient.delete(`/todos/${id}`)
    return true
  },

  async clearAllTickets() {
    await apiClient.delete('/todos')
    return true
  }
}
