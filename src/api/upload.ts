import axios from 'axios'

export const uploadImg = async (file: any) => {
    let formData = new FormData()
    formData.append('file', file)
    const { data } = await axios({
        method: 'POST',
        url: '/api/upload',
        data: formData,
    })

    return data && data.code ? data : false
}
