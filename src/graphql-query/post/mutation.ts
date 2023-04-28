import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation createPost($createPostInput: CreatePostInput!) {
        createPost(CreatePostInput: $createPostInput) {
            success
            msg
            data {
                _id
            }
        }
    }
`

export const UPDATE_POST = gql`
    mutation updatePost($updatePostInput: UpdatePostInput!) {
        updatePost(UpdatePostInput: $updatePostInput) {
            success
            msg
            data {
                _id
            }
        }
    }
`

export const UPDATE_STATUS_POST = gql`
    mutation updateStatusPost($id: String!) {
        updateStatusPost(_id: $id) {
            success
            msg
        }
    }
`

export const REMOVE_POST = gql`
    mutation removePost($id: String!) {
        removePost(_id: $id) {
            success
            msg
        }
    }
`
