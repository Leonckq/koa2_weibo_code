/**
 * @description 微博缓存层
 * @author Leon
 */
const { getBlogListByUser } = require('../services/blog')
const { set, get } = require('./_redis')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'
/**
 * 获取微博广场列表缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  let cacheResult = await get(key)
  if (cacheResult != void 0) {
    return cacheResult
  }
  cacheResult = await getBlogListByUser({ pageIndex, pageSize })
  set(key, cacheResult, 60)
  return cacheResult
}

module.exports = {
  getSquareCacheList
}