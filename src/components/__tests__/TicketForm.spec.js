import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicketForm from '../TicketForm.vue'

describe('TicketForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TicketForm, {
      props: {
        isSubmitting: false
      },
      global: {
        stubs: {
          'Stepper': true,
          'StepperItem': true,
          'StepperTrigger': true,
          'StepperIndicator': true,
          'StepperTitle': true,
          'User': true,
          'Mail': true,
          'Check': true,
          'ArrowRight': true,
          'ArrowLeft': true
        }
      }
    })
  })

  it('renders step 1 by default', () => {
    expect(wrapper.text()).toContain('Ticket Title')
    expect(wrapper.text()).toContain('Owner')
  })

  it('moves to step 2 when clicking next', async () => {
    const nextButton = wrapper.find('button.bg-black')
    await nextButton.trigger('click')
    
    expect(wrapper.text()).toContain('Detailed Description')
  })

  it('moves to step 3 (summary) after step 2', async () => {
    await wrapper.find('button.bg-black').trigger('click')
    await wrapper.find('button.bg-black').trigger('click')
    
    expect(wrapper.text()).toContain('Please review the information')
    expect(wrapper.text()).toContain('Confirm')
  })

  it('emits submit event on final step', async () => {
    await wrapper.find('button.bg-black').trigger('click')
    await wrapper.find('button.bg-black').trigger('click')
    
    const confirmButton = wrapper.find('button.bg-black')
    await confirmButton.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('submit')
  })

  it('disables buttons and shows saving state when isSubmitting is true', async () => {
    // Navigate to step 3
    await wrapper.find('button.bg-black').trigger('click')
    await wrapper.find('button.bg-black').trigger('click')
    
    await wrapper.setProps({ isSubmitting: true })
    
    const confirmButton = wrapper.find('button.bg-black')
    expect(confirmButton.element.disabled).toBe(true)
    expect(confirmButton.text()).toContain('Saving...')
    
    const backButton = wrapper.find('button.font-bold')
    expect(backButton.element.disabled).toBe(true)
  })
})
