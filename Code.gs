function submit(e) {

  //Retrieves the google form response

  var itemResponses = e.response.getItemResponses();
  
  var response = itemResponses[0].getResponse(); 

  //Prompt for Gemini
  var aiPrompt = "Summarize the response from the google form and only summarize, do not saying anything before or after the summarized text: " + response;

  var geminiOutput = getGemini(aiPrompt);

  //Sends gemini response to webhook
  slackWebhook(geminiOutput);

  

}

function getGemini(response){

  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=--GEMINI_API_KEY (NOT VISIBLE)--";

  var payload = {
    "contents": [
        {
          "parts": [
            {
              "text": response
            }
          ]
        }
      ]
  }
      
  var options = {
          "method": "post", 
          "contentType": "application/json",
          "payload": JSON.stringify(payload)
        };

  try {
        var apiResponse = UrlFetchApp.fetch(url, options);
        var json = JSON.parse(apiResponse.getContentText());
        var summary = json.candidates[0].content.parts[0].text;
        Logger.log("API Response: " + apiResponse.getContentText());
        return summary;
      } catch (error) {
          Logger.log("Error sending to Gemini: " + error.toString());
      }

}


function slackWebhook(summary){
  var webhookUrl = "https://hooks.slack.com/services/--WEBHOOK (NOT VISIBLE)--";

  var payload = {
    text: "New Project Inquiry: " + summary
  }

  var options = {
        "method": "post", 
        "contentType": "application/json",
        "payload": JSON.stringify(payload)
      };

  try{
    var slackResponse = UrlFetchApp.fetch(webhookUrl, options);
    Logger.log("Posted to Slack successfully!");
  } catch (error){
    Logger.log("Error posting to Slack: " + error.toString());
  }

}


