import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})



describe('Vuex - Journal Module tests', () => {

    // Basic tests
    test('Initial state', () => {

        const store = createVuexStore( journalState )

        const { isLoading, entries } = store.state.journal
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })


    // Mutations
    test('Mutation: setEntries', () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries)
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('Mutation: updateEntry', () => {
        const store = createVuexStore( journalState )

        const updateEntry = {
            id: "ABC123",
            date: "Sat Jul 18 2021",
            text: "Hi from tests file"
        }

        store.commit('journal/updateEntry', updateEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === updateEntry.id )
        ).toEqual( updateEntry )
    })

    test('Mutation: addEntry deleteEntry', () => {
        const store = createVuexStore( journalState )
        const new_id = 'ABC-123'

        store.commit('journal/addEntry', { id: new_id, text: 'Hello World' } )
        expect( store.state.journal.entries.length ).toBe(3)
        expect(
            store.state.journal.entries.find( e => e.id === new_id )
        ).toBeTruthy()

        store.commit('journal/deleteEntry', new_id )
        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === new_id )
        ).toBeFalsy()
    })


    // Getters
    test('Getters: getEntriesByTerm getEntryById', () => {
        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
        expect( store.getters['journal/getEntriesByTerm']('example').length ).toBe(1)
        expect( store.getters['journal/getEntriesByTerm']('example') ).toEqual([ entry2 ])

        expect( store.getters['journal/getEntryById']('ABC123') ).toEqual( entry1 )
    })

})