import { addDoc, collection, deleteDoc, deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { Dispatch } from 'redux'
import { db } from '../../firebase'
import { IPostListProps, postAction, postStatusProps, postType } from '../../types/posts'

export const postsRead = () => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  onSnapshot(
    collection(db, 'posts'),
    (snapshot) => {
      const newPosts: any = []

      snapshot.docs.map((doc) => {
        newPosts.push({ ...doc.data(), id: doc.id })
      })
      dispatch({ type: postType.POST_READ, payload: newPosts })
    },
    (error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    }
  )
}

export const postCreate = (data: IPostListProps, postID: (id: string) => void) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  addDoc(collection(db, 'posts'), data)
    .then((newDate) => {
      dispatch({ type: postType.POST_CREATE })
      postID(newDate.id)
    })
    .catch((error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    })
}

export const postDelete = (data: IPostListProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  // addDoc(collection(db, 'posts'), data)
  //   .then((newDate) => {
  //     dispatch({ type: postType.POST_CREATE })
  //   })
  //   .catch((error) => {
  //     dispatch({ type: postType.POST_ERROR, payload: error.message })
  //   })

  const postRef = doc(db, 'post', data.id)

  updateDoc(postRef, {
    capital: deleteField(),
  })
    .then(() => {
      dispatch({ type: postType.POST_DELETE })
    })
    .catch((error) => {
      dispatch({ type: postType.POST_ERROR, payload: error.message })
    })
}

export const postStatus = (status: postStatusProps) => (dispatch: Dispatch<postAction>) => {
  dispatch({ type: postType.POST_START })
  try {
    dispatch({ type: postType.POST_STATUS, payload: { ...status } })
    setTimeout(() => {
      dispatch({
        type: postType.POST_STATUS,
        payload: {
          type: '',
          message: '',
        },
      })
    }, 1000)
  } catch (error) {
    dispatch({ type: postType.POST_ERROR, payload: 'error' })
  }
}
