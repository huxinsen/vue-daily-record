const RECORD_DATA = 'RECORD_DATA'

// 设置存储的信息
function setInfo(time, title = '', content = '') {
  const data = JSON.parse(localStorage.getItem(RECORD_DATA) || '{}'),
    dataKeys = Object.keys(data)
  if (!dataKeys.includes(time)) {
    data[time] = []
  }
  const records = data[time]
  records.push({
    id: records.length === 0 ? 1 : parseInt(records[records.length - 1].id) + 1,
    title,
    content,
    time: getTime(),
  })
  localStorage.setItem(RECORD_DATA, JSON.stringify(data))
  return true
}

// 获取存储的信息
function getInfo(time, id) {
  const data = JSON.parse(localStorage.getItem(RECORD_DATA) || '{}'),
    dataKeys = Object.keys(data)
  if (!dataKeys.includes(time)) return []
  const records = data[time]
  if(typeof id !== 'undefined') {
    return records.find(item => {
      return item.id === id
    })
  }
  return records
}

// 删除存储的信息
function deleteInfo(time, id) {
  const data = JSON.parse(localStorage.getItem(RECORD_DATA) || '{}'),
    dataKeys = Object.keys(data)
  if (!dataKeys.includes(time)) return false
  data[time] = data[time].filter(item => {
    return item.id !== id
  })
  localStorage.setItem(RECORD_DATA, JSON.stringify(data))
  return true
}

// 格式化日期
function formatDate(time) {
  const year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return `${year}/${month}/${day}`
}

// 格式化日期字符串
function formatDateString(time) {
  return time
    .split('/')
    .map(item => {
      if (item.length < 2) {
        return '0' + item
      }
      return item
    })
    .join('/')
}

// 获取时间，格式为`小时:分钟`
function getTime() {
  const time = new Date()
  let hours = time.getHours(),
    minutes = time.getMinutes()
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  return `${hours}:${minutes}`
}

export default {
  set: setInfo,
  get: getInfo,
  del: deleteInfo,
  formatDate,
  formatDateString,
}
