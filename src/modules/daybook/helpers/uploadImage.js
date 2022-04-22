
import axios from 'axios'

const uploadImage = async ( file ) => {
    console.log('file:')
    console.log(file)

    if ( !file ) return

    try {
        const formData = new FormData
        formData.append('upload_preset', 'curso-vue')
        formData.append('file', file)
        
        const url = 'https://api.cloudinary.com/v1_1/dkfdkhhsd/image/upload'
        const { data } = await axios.post(url, formData)

        console.log(data)
        return data.secure_url

    } catch (error) {
        console.log('There was an error loading the image')
        console.log(error)
        return null
    }

}

export default uploadImage