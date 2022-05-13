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

})