export async function useTest(info) {
  return new Promise(async(resolve, reject) => {
    console.log('====info===', info)
  })
}
