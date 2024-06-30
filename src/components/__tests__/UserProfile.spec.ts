import { describe, it, expect, vi } from 'vitest'

import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import axios from 'axios'

import { render } from 'vue'
import UserProfile from '../UserProfile.vue'
type StatId = {id:number; rating:number}
type Stat = {id:StatId; anzahl:number}
const twoStatsResponse: Stat[] = [
  {id: {id: 1, rating: 1}, anzahl: 1},
  {id: {id: 2, rating: 1}, anzahl: 1}
]

describe('QuestionAnswer', () => {
  vi.mock('axios')

  it('Zeigt an, dass noch keine Stats vorhanden sind, wenn keine vorhanden sind', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: [] })
    const wrapper = shallowMount(UserProfile,
      { props: { title: 'test' }})
    await flushPromises()
    expect(wrapper.text()).toContain('Es sind noch keine Stats vorhanden!')
  })

  it('Zeigt Alert nicht an, wenn Stats vorhanden sind', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoStatsResponse })
    const wrapper = shallowMount(UserProfile,
      { props: { title: 'test' }})
    await flushPromises()
    expect(wrapper.text()).not.toContain('Es sind noch keine Stats vorhanden!')
  })

  //Alle weiteren Auswirkungen der Axios Methoden beschränken sich nur auf das Style-Attribut der Progress Bars
  //auf welches für mich leider nicht dynamisch testbar war
})

