import React, { useState, useEffect } from "react";
import axios from "axios";
import { AutomationsManager, RolloutConnectProvider, AutomationCreator, curlyTemplate } from "@rollouthq/connect-react";


export function App() {
  const rolloutConnectToken = process.env.ROLLOUT_TOKEN;

  return (
    <div id="app">
      <button
        className="submit-form-button"
        onClick={() => sendFormSubmissionEvent(rolloutConnectToken)}
      >
        Simulate Form Submission
      </button>
      <RolloutConnectProvider token={rolloutConnectToken}>
        <div className="my-automations-wrapper">
          {/* <AutomationsManager /> */}
          <AutomationCreator 
            prefilled={{
              name: "Add a new subscriber on Klaviyo",
              trigger: {
                appKey: "123formBuilder-preview",
                triggerKey: "new_submission",
                inputParams: {
                  form_id: "6257682"
                }
              },
              action: {
                appKey: "klaviyo",
                actionKey: "addSubscriber",
                inputParams: {
                  email: curlyTemplate("{{email}}"),
                  firstName: curlyTemplate("{{full_name}}"),
                  lastName: curlyTemplate("{{full_name}}"),
                  phoneNumber: curlyTemplate("{{phone_number}}")
                }
              }
            }}
            renderFields={{
              trigger: false,
              action: ({
                createElement,
                Card,
                ActionAppKeyField,
                ActionKeyField,
                ActionCredentialIdField,
                ActionInputFields
              }) => {
                return createElement(
                  Card,
                  null,
                  // createElement(ActionAppKeyField, { disabled: true }),
                  // createElement(ActionKeyField, { disabled: true }),
                  createElement(ActionCredentialIdField),
                  createElement(ActionInputFields)
                );
              },
              onAutomationCreated: console.log("automation created"),
              onCancel: console.log("automation cancelled")
            }}
          />
        </div>
      </RolloutConnectProvider>
    </div>
  );
}

function sendFormSubmissionEvent(rolloutConnectToken) {
  axios.post(
    "https://api.rollouthq.com/trigger-event",
    { triggerKey: "new_submission", 
      payload: {
        "email": "ak@rollouthq.com",
        "full_name": "AK Lalani",
        "job_title": "Founder",
        "phone_number": "+14158181254"
      } 
    },
    {
      headers: {
        Authorization: `Bearer ${rolloutConnectToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

