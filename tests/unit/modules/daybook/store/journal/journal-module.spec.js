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
        const newID = 'ABC-123'

        store.commit('journal/addEntry', { id: newID, text: 'Hello World' } )
        expect( store.state.journal.entries.length ).toBe(3)
        expect(
            store.state.journal.entries.find( e => e.id === newID )
        ).toBeTruthy()

        store.commit('journal/deleteEntry', newID )
        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === newID )
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


    // Actions
    test('Actions: loadEntries', async() => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2) 
    })

    test('Actions: updateEntry', async() => {
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: "ABC123",
            date: "Sat Jul 18 2021",
            text: "Hi from mock data",
            anotherField: true,
            anotherOne: { a: 1 }
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
        ).toEqual({ 
            id: "ABC123",
            date: "Sat Jul 18 2021",
            text: "Hi from mock data",
        })
    })

    test('Actions: createEntry deleteEntry', async() => {
        const store = createVuexStore( journalState )

        // Create
        const newEntry = { date: "Sat Jul 21 2021", text: "New entry from tests" }
        const newEntryID = await store.dispatch('journal/createEntry', newEntry)
        
        expect( typeof newEntryID ).toBe('string')
        expect(
            store.state.journal.entries.find( e => e.id === newEntryID )
        ).toBeTruthy()

        // Delete
        await store.dispatch('journal/deleteEntry', newEntryID)

        expect(
            store.state.journal.entries.find( e => e.id === newEntryID )
        ).toBeFalsy()
    })

})