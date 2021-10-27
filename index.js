const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST,GET',
  'Access-Control-Allow-Origin': '*'
};

addEventListener('fetch', event => {
  const { request } = event
  const { url } = request
  const path = url.split("/")[3];
  if (request.method === "POST") {
    if (path == "addPost")
      return event.respondWith(handlePostRequest(request).catch(err => {
        return handleError(err.status, err.message);
      }));
    else if (path == "addPostReaction")
      return event.respondWith(handlePostReaction(request).catch(err => {
        return handleError(err.status, err.message);
      }));
  }
  else if (request.method === "OPTIONS") {
    return event.respondWith(new Response("OK", {
      headers: corsHeaders
    }));
  }
  else if (request.method === "GET" && path == "getAllPosts") {
    return event.respondWith(handleGetRequest(request).catch(err => {
      return handleError(err.status, err.message)
    }));
  } else {
    return handleError(404, "Page Not Found Please Try Again!! with correct URl")
  }
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleGetRequest(request) {
  const url = request.url;
  const path = url.split("/");
  console.log(path[3]);
  const allPostsKeys = await MAP.list()

  const promises = allPostsKeys.keys.map(getValue);
  const values = await Promise.all(promises)

  return new Response(JSON.stringify(values), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      ...corsHeaders
    }
  });
}

async function handlePostRequest(request) {
  request_body = await request.json()
  if (!(request_body && request_body.title, request_body.username && request_body.post && request_body.post.text)) {
    throw { message: "Invalid Request Body. Please use the correct request data and try again!", status: 400 }
  }
  if (!request_body.post.reactions) {
    reactions = {
      like: 0,
      dislike: 0
    }
    request_body.post.reactions = reactions
    request_body.timestamp = new Date().getTime();
  }
  if (!request_body.post.comments) {
    request_body.post.comments = []
  }
  let uuid = await crypto.randomUUID();
  request_body.id = uuid;
  await MAP.put(uuid, JSON.stringify(request_body))
  return new Response(JSON.stringify(request_body), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      ...corsHeaders
    }
  });
}

async function handlePostReaction(request) {
  request_body = await request.json();
  if (!(request_body && request_body.post_id && (request_body.comment || request_body.reaction)))
    throw { message: "Invalid Request Body. Please use the correct request data and try again!", status: 400 }
  var post = await MAP.get(request_body.post_id);
  var post_json = JSON.parse(post);
  if (request_body.comment && request_body.comment.username && request_body.comment.text) {
    post_json.post.comments.push(request_body.comment)
  } else if (request_body.reaction && (request_body.reaction.like || request_body.reaction.dislike)) {
    if (request_body.reaction.like)
      post_json.post.reactions.like = post_json.post.reactions.like + 1;
    else
      post_json.post.reactions.dislike = post_json.post.reactions.dislike + 1;
  } else {
    throw { message: "Invalid Request Body. Please use the correct request data and try again!", status: 400 }
  }
  await MAP.put(request_body.post_id, JSON.stringify(post_json))
  return new Response(JSON.stringify(post_json), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      ...corsHeaders
    }
  });
}

async function handleError(error_code, message) {
  return new Response(message, {
    status: error_code,
  })
}

async function getValue(key) {
  return await MAP.get(key.name, { type: "json" });
}
