import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'

describe('About View tests', () => {
    
    test('Component should be rendered correctly', () => {
        const wrapper = shallowMount( About )
        expect( wrapper.html() ).toMatchSnapshot()
    })
})
