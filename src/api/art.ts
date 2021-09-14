import axios from 'axios'

export const getArtList = async (obj: any) => {
    // 通过append向form对象添加数据
    const { data } = await axios({
        method: 'GET',
        url: '/api/article/list',
        data: { ...obj },
    })
    return data && data.code ? data : []
}

export const insertArt = async (obj: any) => {
    // 通过append向form对象添加数据
    const { data } = await axios({
        method: 'POST',
        url: '/api/article/insert',
        params: { ...obj },
    })
    return data && data.code ? data : false
}

export const getArtDetail = async (_id: String) => {
    // 通过append向form对象添加数据
    const { data } = await axios({
        method: 'GET',
        url: '/api/article/detail',
        params: { _id },
    })
    return data && data.code ? data : false
}
