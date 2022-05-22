const sendTelegramAlert = async (from, value, hash) => {
  // Telegram creds
  const telegram_bot_id = ""; // <-- ENTER TELEGRAM BOT ID
  const chat_id = ""; // <-- ENTER TELEGRAM CHAT ID

  // alert message
  let message = "Wallet " + from + " coinflipped " + value + " MATIC. https://polygonscan.com/tx/" + hash;

  // Moralis httpRequest to Telegram API
  Moralis.Cloud.httpRequest({
    url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    params: "chat_id=" + chat_id + "&text=" + message,
  }).then(
    function (httpResponse) {
      logger.info(httpResponse.text);
    },
    function (httpResponse) {
      logger.info("Request failed with response code " + httpResponse.status);
    }
  );
};

Moralis.Cloud.define("watchPolyflip", async (request) => {
  const logger = Moralis.Cloud.getLogger();

  // check 1/2: telegram_bot_id exists
  if (!request.params.telegram_bot_id || !request.params.chat_id ) {
    logger.info("error: missing telegram_bot_id or chat_id param.");
  } else {
    let bot_id = request.params.telegram_bot_id;
    let chat_id = request.params.chat_id;
    // capture params
    // method of alerting
    let alert_method = "telegram";
    // conditions to be met
    let conditions = request.params.conditions;
    // user threshold
    let threshold = request.params.threshold;
    // user notes
    let notes = request.params.notes;

    if (!bot_id || !chat_id || !alert_method) {
      return null;
    }

    // check 2/2: address is not already being watched
    const countQuery = new Moralis.Query("UsedTelegramBot", {useMasterKey:true});
    countQuery.equalTo("bot_id", bot_id);
    const watchCount = await countQuery.count();

    if (watchCount > 0) {
      // already on watch list, don't sync again
      return null;
    }

    const row_object = new Moralis.Object();
    // const row_object = await query.first();
    // set notes for that row
    row_object.set("notes", notes);
    // set alert method for that row
    row_object.set("alertMethod", alert_method);
    // set conditons for that row
    row_object.set("conditions", conditions);
    // set threshold
    row_object.set("threshold", threshold);

    // save it
    try {
      await row_object.save();
    } catch (err) {
      logger.info(err);
    }

    Moralis.Cloud.afterSave("PolygonTransactions", async function (request) {
      let from_address = request.object.get("from_address");
      let value_decimal = request.object.get("decimal");

      logger.info("-------------------------------");
      logger.info(JSON.stringify(from_address));
      logger.info("------ From address ------");

      logger.info("-------------------------------");
      logger.info(JSON.stringify(request.object));
      logger.info("------ Transfer Data ------");

      logger.info("-------------------------------");
      logger.info(JSON.stringify(value_decimal.value));
      logger.info("------ Value Rendered ------");

      if (Number(value_decimal.value) >= Number(threshold)) {
        await sendTelegramAlert(from_address, value_decimal.value, request.object.get("hash"));
      }
    });

    return true;
  }
});
