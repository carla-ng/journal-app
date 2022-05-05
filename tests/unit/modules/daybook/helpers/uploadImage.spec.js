import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

describe('UploadImage tests', () => {

    test('Must load a file and return a url', async() => {

        const { data } = await axios.get('https://res.cloudinary.com/dkfdkhhsd/image/upload/v1650663906/vf9ed0lummw0iwe9jsxg.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'photo.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

    })

})