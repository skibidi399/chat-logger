let lastMessage = ""

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    try {
      let data = {}
      try {
        data = JSON.parse(event.body)
      } catch {
        // fallback if not valid JSON (BDFD default encoding)
        const params = new URLSearchParams(event.body)
        data.message = params.get("message")
      }

      lastMessage = data.message || ""
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "ok", message: lastMessage })
      }
    } catch (err) {
      return { statusCode: 500, body: "Error: " + err.message }
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
