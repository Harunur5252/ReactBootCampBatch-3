
export const formateContact = (data) => {
  return {
      id:data?.id,
      imgId : data?.attributes?.image?.data?.id,
      ...data?.attributes,
      image : data?.attributes?.image?.data?.attributes?.url
  }
}