args = {
  body: {
    variables: {
      document: "21222673",
      document_type: "CC",
      incomes_fifty_percent: 0,
      incomes_forty_percent: 0,
      incomes_ten_percent: 0,
      last_month_available: 0,
      last_month_expense_fixed: 0,
      last_month_expense_variable: 0,
      last_month_expenses: 10000000,
      last_month_incomes: 6000000,
      name: "Flor Alva Castro",
      top_expenses: {
        Donaciones: 240000.12,
      },
    },
    currentStep: "Saludo",
  },
};

const startConversationMock = async function () {
  console.log("Mock startConversation called");

  try {
    const access_token = await startConversation(
      accessToken,
      "1030637947",
      "CC",
      "bbog",
      args.body,
    );

    return { access_token };
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
};

const getInternalUrlMock = async function (url) {
  console.log(url);
};

async function startConversation(body) {
  const conversationUrl =
    "https://b8q9hdnlrb.execute-api.us-east-2.amazonaws.com/stg/v2/start-conversation";
  const conversationHeaders = {
    "Content-Type": "application/json",
    Authorization:
      "Basic NXFzMzEzYnZldnMyMDdndmdmZzhmbTVvbjk6Y2pvZDdwdTUxdTgxNzZ2a2tvNTg3N2lwbjUzOG4xbjRyaDY0Z2ptYXRnNTBkdnNxOGtn",
  };

  try {
    const response = await fetch(conversationUrl, {
      method: "POST",
      headers: conversationHeaders,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    return data.access_token;
  } catch (error) {
    console.error("Error starting conversation:", error);
    throw error;
  }
}
