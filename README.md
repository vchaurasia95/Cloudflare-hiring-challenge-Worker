# 👷 Cloudflare Hiring Challenge Worker

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

## HTTP Verbs


| Verbs        | Methods        | Description|           
| :------------- |:-------------|:------------- |          
| /getAllPosts      | GET |To get all the posts|   
| /addPost | POST| To add new Post |
| /addPostReaction | POST|To add comment or increase like/dislike count of the post|             

## Request & Response Examples

### API Resources

  - [GET /getAllPosts](#get-getAllPosts)
  - [POST /addPost](#post-addPost)
  - [POST /addPostReaction](#post-addPostReaction)

### GET /getAllPosts

Example: https://hiring-challenge-general.hiring-challenge.workers.dev/getAllPosts

Response body:

    [
        {
            "username": "vchauras",
            "title": "New Post",
            "post": {
                "text": "You can add new post by clicking on the respective button on the upper left corner of the screen.",
                "reactions": {
                    "like": 4,
                    "dislike": 3
                },
                "comments": []
            },
            "timestamp": 1635311646713,
            "id": "0e025095-3298-4aca-b6d2-e319767b8471"
        },
        {
            "username": "vchaurasia95",
            "title": "Thanks",
            "post": {
                "text": "Thanks for trying out this application. Hope you had fun.",
                "reactions": {
                    "like": 0,
                    "dislike": 0
                },
                "comments": []
            },
            "timestamp": 1635311783977,
            "id": "2576c7f0-93d8-4662-8f4a-10ae974c41ad"
        },
        {
            "username": "vchaurasia95",
            "title": "Comments",
            "post": {
                "text": "You can also add comment on the post by clicking on the '+' icon and entering the required details.\nIf a post contains one or more comments you can view them using the 'v' icon. :)",
                "reactions": {
                    "like": 7,
                    "dislike": 0
                },
                "comments": [
                    {
                        "username": "vchauras",
                        "text": "Hey, Great Now you can see comments to this post !!"
                    }
                ]
            },
            "timestamp": 1635311463620,
            "id": "37235f0e-86bd-4377-a7dc-91e8db7056b9"
        },
        {
            "username": "vchauras",
            "title": "Interactions",
            "post": {
                "text": "You can like/dislike a post by clicking on the respective icons.",
                "reactions": {
                    "like": 5,
                    "dislike": 0
                },
                "comments": [
                    {
                        "username": "vchaurasia95",
                        "text": "Great Info!"
                    }
                ]
            },
            "timestamp": 1635311306995,
            "id": "386044a6-5771-493c-a204-2feed2dca9f8"
        },
        {
            "username": "vchaurasia95",
            "title": "Hello!!",
            "post": {
                "text": "Hi All, Welcome to my newly created timeline.",
                "reactions": {
                    "like": 2,
                    "dislike": 1
                },
                "comments": []
            },
            "timestamp": 1635310174532,
            "id": "b7d921da-d7f0-453d-a0d4-927184599902"
        }
    ]

### POST /addPost

Example: https://hiring-challenge-general.hiring-challenge.workers.dev/addPost

Request body:

    {
        "title": "My View 3",
        "username": "vchaurasia93",
        "post":{
            "text":"hello-world"
        }
    }

Response body:

    {
        "title": "My View 3",
        "username": "vchaurasia93",
        "post": {
            "text": "hello-world",
            "reactions": {
                "like": 0,
                "dislike": 0
            },
            "comments": []
        },
        "timestamp": 1635315611508,
        "id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3"
    }

### POST /addPostReaction

Example: Create – POST  https://hiring-challenge-general.hiring-challenge.workers.dev/addPostReaction

There are 3 scenrios in which this API can be used based on the request data:

### `Like`

Request body:

    {
        "post_id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3",
        "reaction": {
            "like": true
        }
    }

Response body:

    {
        "title": "My View 3",
        "username": "vchaurasia93",
        "post": {
            "text": "hello-world",
            "reactions": {
            "like": 1,
            "dislike": 0
            },
            "comments": []
        },
        "timestamp": 1635315611508,
        "id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3"
    }
### `Dislike`
Request body:

    {
        "post_id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3",
        "reaction": {
            "dislike": true
        }
    }

Response body:

    {
        "title": "My View 3",
        "username": "vchaurasia93",
        "post": {
            "text": "hello-world",
            "reactions": {
            "like": 1,
            "dislike": 1
            },
            "comments": []
        },
        "timestamp": 1635315611508,
        "id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3"
    }

### `Comment`

Request body:

    {
        "post_id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3",
        "comment": {
            "username": "vchauras",
            "text": "Hello World!!"
        }
    }

Response body:

    {
    "title": "My View 3",
    "username": "vchaurasia93",
    "post": {
        "text": "hello-world",
        "reactions": {
        "like": 1,
        "dislike": 0
        },
        "comments": [
        {
            "username": "vchauras",
            "text": "Hello World!!"
        }
        ]
    },
    "timestamp": 1635315611508,
    "id": "b3ea4acf-12b9-4f9c-b1c0-e57d356c10b3"
    }
    