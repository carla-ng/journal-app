import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Fab Component tests', () => {
    
    test('Must show icon by default', () => {
        const wrapper = shallowMount( Fab )
        const tag = wrapper.find('i')
        expect( tag.classes('fa-plus') ).toBeTruthy()
    })

    test('Must show icon fa-circle from argument', () => {
        const wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const tag = wrapper.find('i')
        expect( tag.classes('fa-circle') ).toBeTruthy()
    })
    
    test('Must emit on:click event when clicked', () => {
        const wrapper = shallowMount( Fab )
        wrapper.find('button').trigger('click')
        expect( wrapper.emitted('on:click') ).toHaveLength(1)
    })
    
})
