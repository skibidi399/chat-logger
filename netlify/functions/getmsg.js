// netlify/functions/getmsg.js
let latestMessage = null;

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      latestMessage = body.message || null;
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "ok", received: latestMessage }),
      };
    } catch (err) {
      return { statusCode: 400, body: "Invalid JSON" };
    }
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: latestMessage }),
    };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
