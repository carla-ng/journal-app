import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Entry Component tests', () => {

    const mockRouter = {
        push: jest.fn()
    }
    
    const wrapper = shallowMount( Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('Must match snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Must redirect when clicking entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith(
            { "name": "entry", "params": {"id": journalState.entries[0].id }}
        )
    })

    test('Tests with computed properties', () => {
        expect( wrapper.vm.day ).toBe(18)
        expect( wrapper.vm.month ).toBe('July')
        expect( wrapper.vm.yearAndDay ).toBe('2021, Sunday')
    })

})