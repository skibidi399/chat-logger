let lastMessage = ""

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body)
    lastMessage = data.message || ""
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", message: lastMessage })
    }
  }

  if (event.httpMethod === "GET") {
    const temp = lastMessage
    lastMessage = "" // clear after read
    return {
      statusCode: 200,
      body: JSON.stringify({ message: temp })
    }
  }

  return { statusCode: 405, body: "Method not allowed" }
}
