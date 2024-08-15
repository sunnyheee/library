// utils/fetchBookData.ts

export const fetchBookDataFromOpenBD = async (isbn: string) => {
  try {
    const response = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
    const data = await response.json()

    if (data && data[0]) {
      const bookData = data[0].summary
      return {
        title: bookData.title,
        author: bookData.author,
        publishing: bookData.publisher,
      }
    } else {
      throw new Error('책 정보를 찾을 수 없습니다.')
    }
  } catch (error) {
    console.error('Error fetching book data:', error)
    throw error
  }
}
