import axios from 'axios'

import { getToken } from '../utils'

export const uploadImg = async (file: any) => {
    let formData = new FormData()
    formData.append('file', file)
    const { data } = await axios({
        method: 'POST',
        url: '/api/upload',
        headers: { Authorization: 'Bearer' + getToken() },
        data: formData,
    })

    return data && data.code ? data : false
}
