import { gql } from "@apollo/client"

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        getAllPosts {
            success
            msg
            data {
                _id
                title
                content
                description
                thumbnail
                status
                category {
                    _id
                    title
                }
                author {
                    _id
                    name
                }
                createdAt
                updatedAt
            }
        }
    }
`

export const GET_POST_BY_ID = gql`
    query getPostById($id: String!) {
        getPostById(_id: $id) {
            success
            msg
            data {
                _id
                title
                content
                description
                thumbnail
                status
                category {
                    _id
                    title
                }
                author {
                    _id
                    name
                }
                createdAt
                updatedAt
            }
        }
    }
`
