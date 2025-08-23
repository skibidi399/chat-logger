let latestMessage = "";

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      latestMessage = body.message || "";
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
      };
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON" })
      };
    }
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: latestMessage })
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
};
