/**
 *  用户
 */
interface User {
  _id?: string
  nickname?: string
  email?: string
  avatar?: string
  gender?: string
  address?: object
  createdAt?: string
  updatedAt?: string
}

/**
 *  分类 category
 */

interface Category {
  label?: String
  value?: Number
}

/**
 *  文章状态
 */
interface ArtState {
  value?: number
  label?: string
}

/**
 *  文章分类
 */
interface ArtClassify {
  value?: number
  label?: string
}

/**
 *  文章类型
 */
interface Article {
  _id?: string
  cover?: string
  title?: string
  author?: string
  classify?: ArtClassify
  artState?: ArtState
  desc?: string
  html?: string
  isDel?: boolean
  createdAt?: string
  updatedAt?: string
}
