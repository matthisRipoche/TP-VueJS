import apiClient from '../client'

export default {
  async getAllTodos() {
    const response = await apiClient.get('/todos')
    return Array.isArray(response.data) ? response.data.reverse() : []
  },

  async addTodo(data) {
    const response = await apiClient.post('/todos', data)
    return response.data
  },

  async deleteTodo(id) {
    await apiClient.delete(`/todos/${id}`)
    return true
  },

  async clearAllTodos() {
    await apiClient.delete('/todos')
    return true
  }
}
