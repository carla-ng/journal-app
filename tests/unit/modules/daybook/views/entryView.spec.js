import EntryView from '@/modules/daybook/views/EntryView.vue'
import journal from '@/modules/daybook/store/journal'
import Swal from 'sweetalert2'

import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import { journalState } from '../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}) )


describe('EntryView tests', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: 'XYZ456'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })


    test('Must redirect user when ID does not exist', () => {
        
        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'This ID does not exist in store'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
     })

     test('Must show entry correctly', () => {
        expect( wrapper.html() ).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()
     })

     test('Must delete entry and leave its page', (done) => {
        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )
        wrapper.find('.btn-danger').trigger('click')
        
        expect( Swal.fire ).toHaveBeenCalledWith({
            title: 'Are you sure you want to delete this entry?',
            text: 'Once it is deleted you cannot get it back',
            showDenyButton: true,
            confirmButtonText: 'Yes, I am sure'
        })

        setTimeout(() => {
            expect( store.dispatch ).toHaveBeenCalledWith('journal/deleteEntry', 'XYZ456')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()
        }, 1);
     })

})