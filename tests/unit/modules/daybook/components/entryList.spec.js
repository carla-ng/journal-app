import EntryList from '@/modules/daybook/components/EntryList.vue'
import journal from '@/modules/daybook/store/journal'

import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

//import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})


describe('EntryList Component tests', () => {

    /*
    const journalMockModule = {
        namespaced: true,
        getters: {
            //getEntriesByTerm: jest.fn()
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }

    const store = createStore({
        modules: {
            journal: { ...journalMockModule }
        }
    })
    */

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })

    test('Must call getEntriesByTerm without term and show 2 entries', () => {
       expect( wrapper.findAll('entry-stub').length ).toBe(2)
       expect( wrapper.html() ).toMatchSnapshot()
    })

    test('Must call getEntriesByTerm and filter the entries', async() => {
        const input = wrapper.find('input')
        await input.setValue('example')

        expect( wrapper.findAll('entry-stub').length ).toBe(1)
     })

     test('New entry button must redirect to /new ', () => {
        wrapper.find('button').trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
     })

})