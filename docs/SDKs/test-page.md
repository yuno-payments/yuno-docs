## Thread

[yuno-tw](https://writechoice.slack.com/archives/C08G04LEC5A/p1755526010568169)

Saved for later

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Aug 18th at 11:06 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755526010568169)  

[Code Documentation Cleanup]  ![:thread:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f9f5@2x.png)

19 replies

----------

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Aug 18th at 11:07 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755526020390119?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Hi  [@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE),[@Gui](https://writechoice.slack.com/team/U08UESBCPD2),[@Heitor](https://writechoice.slack.com/team/U02QWCKQNEB),  
I worked on a  [template page](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test#/)  for the code documentation cleanup we discussed on Friday. This way, we can continue the discussion on this page, and once we define all the details, we can apply the same adjustments to all the guides.These are the tasks I worked on:  

-   Removed redundant inline comments from code snippets.
-   Moved parameter descriptions from comments into existing tables.
-   Standardized comment format (single-line instead of multi-line).
-   Improved code readability by reducing wordiness.
-   Moved explanations above/below code blocks rather than inline.

Here, you can compare the original and the modified page, and you can also see the changes on the PR:  

-   [Full Web SDK v1.2 (original)](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/full-sdk-v12#/)
-   [Full Web SDK v1.2 (modified)](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test#/)
-   [PR #27](https://github.com/yuno-payments/yuno-docs/pull/27/files)

(edited)

![:writechoice:](https://emoji.slack-edge.com/T02AQ4MK8KH/writechoice/830db2a6a7b53477.png)1![:+1:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f44d@2x.png)1

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Aug 18th at 1:21 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755534077780119?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Feel free to comment on the PR if you like.

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [Aug 18th at 1:22 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755534133595339?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

ill get back to u tomorrow

![:+1:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f44d@2x.png)1

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [Aug 19th at 2:46 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755625594190269?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

1.  The Parameter/description table needs a title, otherwise it looks as part of the previous section.
2.  I don't like "Example usage" as a title, use something else
3.  I feel step 1 has no actual instructions, how is the library included?
4.  Change public_api_key in step 2 to code format instead of bold
5.  "Check the  [Get your API credentials](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/developers-credentials)  guide." This sentence feels unnatural
6.  Step 3 has a table with some repeated content from the table at the start. Try linking to a central location within the article and/or avoid repeat information.
7.  "access the  [Render mode](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test?isFramePreview=true#mode-of-form-rendering)  under the complementary features page" remove "the" before render mode
8.  "Display the payment methods by using the function  `yuno.mountCheckout()`" No need to mention the function twice.
9.  The callout saying "After Step 7, you can complete the end-to-end integration by accessing  [Step by Step integration of the Full SDK](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/full-sdk-workflow)." is very problematic. The linked article does not have that name, and the instructions related are not clear. Ideally, we want all instructions within the article. Try to decipher what the user is supposed to do here and we'll assess. It's very confusing as is.
10.  Form of the issuer is probably better as issuer's form
11.  Mode of form rendering should be "render mode"
12.  This should go at the start of its section: "This feature is optional and is intended for advanced use cases where you need to customize how device identification is handled via cookies."

![:writechoice:](https://emoji.slack-edge.com/T02AQ4MK8KH/writechoice/830db2a6a7b53477.png)1

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Aug 19th at 2:51 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755625872068099?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

I'll work on it  [@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE)  ![:+1:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-medium/1f44d@2x.png)

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Aug 20th at 9:55 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1755694551058499?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Hi  [@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE),  
I applied all the points of your feedback. Regarding point 6, I merged the table from Step 3 with the main table at the top of the page and removed all duplicate parameters.  
Please let me know if you'd like to make more changes. Once we're done, I will apply all these updates to the original  [Full Web SDK v1.2](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/full-sdk-v12#/)  page. (edited)

[9:56](https://writechoice.slack.com/archives/C08G04LEC5A/p1755694589227999?thread_ts=1755526010.568169&cid=C08G04LEC5A)

cc:  [@Gui](https://writechoice.slack.com/team/U08UESBCPD2)

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Tuesday at 11:17 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1756822629228889?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

I see that we forgot about this thread. Let me know if you want me to apply these changes to the site  [@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE).

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [Tuesday at 11:56 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1756824965440329?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

I haven't had the time to look into this. I'll try to do it today  [@Damián](https://writechoice.slack.com/team/U07FB71NRDL)

![:+1:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f44d@2x.png)1

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Tuesday at 11:57 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1756825037013079?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Don't rush  
I'm following up on this topic so we can work on it when we have the chance

![:+1:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f44d@2x.png)1

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [Friday at 6:14 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1757106852623449?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Checking this now, I assume changes are applied to  [Full Web SDK v1.2 (modified)](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test#/)

![:white_check_mark:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/2705@2x.png)1

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [Friday at 6:20 PM](https://writechoice.slack.com/archives/C08G04LEC5A/p1757107210001169?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

In step two, change this: For more information on obtaining your API credentials, see the Get your API credentials guide.  
to this: See the credentials ("credentials" linked to page, of course) page for more information.In step 4, just say "Display the payment methods by using:" then leave the box with mountcheckout, otherwise, it appears twice and looks odd.The red box titled Continue Payment Method should be titled  `ContinuePayment`method, more consistent and no translation issues

[6:20](https://writechoice.slack.com/archives/C08G04LEC5A/p1757107214901859?thread_ts=1755526010.568169&cid=C08G04LEC5A)

[@Damián](https://writechoice.slack.com/team/U07FB71NRDL)

![:writechoice:](https://emoji.slack-edge.com/T02AQ4MK8KH/writechoice/830db2a6a7b53477.png)1

Saved for later

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [Today at 8:43 AM](https://writechoice.slack.com/archives/C08G04LEC5A/p1757331833745639?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Hi  [@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE),  
Exactly, changes have been applied to  [Full Web SDK v1.2 (modified)](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test#/). Will work on step two and get back to you.

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [1 hour ago](https://writechoice.slack.com/archives/C08G04LEC5A/p1757336702091179?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Sounds good!

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [14 minutes ago](https://writechoice.slack.com/archives/C08G04LEC5A/p1757338811180409?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

[@Jonathan Castrillon](https://writechoice.slack.com/team/U08ES1EK6JE), all changes have been applied to  [Full Web SDK v1.2 (modified)](https://docs.y.uno/v1.0.2_sdk-section-restructure/docs/code-documentation-cleanup-test#/).

![:raised_hands:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/1f64c@2x.png)1

![](https://ca.slack-edge.com/T030BEKNKEJ-U08ES1EK6JE-df0f5c5c8a71-48)

Jonathan Castrillon [13 minutes ago](https://writechoice.slack.com/archives/C08G04LEC5A/p1757338872396209?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Great! I gather our next steps would be to replicate the approach on the other SDK documents, would u agree?

![:white_check_mark:](https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-small/2705@2x.png)1

![](https://ca.slack-edge.com/T02AQ4MK8KH-U07FB71NRDL-ad536b915f9a-48)

Damián [12 minutes ago](https://writechoice.slack.com/archives/C08G04LEC5A/p1757338953675569?thread_ts=1755526010.568169&cid=C08G04LEC5A)  

Exactly, I'm working on the branch  `v1.0.2_sdk-section-restructure`.  
So that we can merge these changes to  `v1.0.2`  next. (edited)

[10:42](https://writechoice.slack.com/archives/C08G04LEC5A/p1757338964252619?thread_ts=1755526010.568169&cid=C08G04LEC5A)

I'll work on it!

---

Help me create a list of tasks that I need to do based on the Thread below:

I'll draft a concise, actionable task list from the Slack thread and set it up so we can track progress.

I pulled out all actionable items from the Slack thread and set them up as trackable tasks.

- Confirm latest feedback applied on modified Full Web SDK v1.2 page
- Port all approved edits to original Full Web SDK v1.2 page
- Create SDK docs style guide (tables, headings, wording, comments)
- Standardise parameter tables with titles across all SDK guides
- Replace “Example usage” headings with an agreed alternative
- Ensure Step 1 includes explicit library inclusion per platform
- Change credentials phrasing to “See the credentials” (linked)
- Deduplicate parameter info; centralise references within each article
- Use “render mode” terminology; fix “issuer’s form” wording
- Adjust mountCheckout phrasing to avoid repetition
- Rename “Continue Payment” block to the `ContinuePayment` method
- Move optional feature notices to the start of their sections
- Remove/replace unclear callouts; inline instructions where needed
- Apply style guide to Web SDK guides
- Apply style guide to Android SDK guides
- Apply style guide to iOS SDK guides
- Apply style guide to Flutter SDK guides
- Apply style guide to Build your integration & Direct flow
- Validate: build docs, check links/anchors, code block formatting
- Open PR(s), request review, merge to branch, then to v1.0.2
- Remove temporary test page at `docs/SDKs/test-page.md`

Let me know if you want me to start by porting the approved edits to the original Full Web SDK v1.2 page, or prioritise the style guide first.

---

I need to take what I did on docs/SDKs/web-sdk-integrations/sdk-v12/code-documentation-cleanup-test.md, and replicate this approach on the other SDK documents:
- Can you help me create a checklist with all the pages we need to work on?
- Use the docs/SDKs/Technical Writing - Good Practices Guide.md
- Use American English.

---

### SDK Cleanup Checklist (visible pages only)

#### Web SDK integrations
- [ ] web-sdk-integrations/index.md
- [ ] web-sdk-integrations/full-checkout-sdk.md
- [ ] web-sdk-integrations/sdk-customizations.md
- [ ] web-sdk-integrations/3ds-setup-sdk.md
- [ ] web-sdk-integrations/payment-status.md
- [ ] web-sdk-integrations/loader.md
- [ ] web-sdk-integrations/other-integrations.md
- [ ] web-sdk-integrations/demo-app.md
- [ ] web-sdk-integrations/alternative-sdks/index.md
- [ ] web-sdk-integrations/alternative-sdks/headless-sdk-enrollment.md
- [ ] web-sdk-integrations/alternative-sdks/headless-sdk-payment.md
- [ ] web-sdk-integrations/secure-fields-web/index.md
- [ ] web-sdk-integrations/secure-fields-web/secure-fields-enrollment.md
- [ ] web-sdk-integrations/secure-fields-web/secure-fields-payment.md
- [ ] web-sdk-integrations/lite-checkout-sdk/index.md
- [ ] web-sdk-integrations/lite-checkout-sdk/enrollment-lite-sdk.md
- [ ] web-sdk-integrations/sdk-v10/index.md
- [ ] web-sdk-integrations/sdk-v10/full-sdk-v10.md
- [ ] web-sdk-integrations/sdk-v11/index.md
- [ ] web-sdk-integrations/sdk-v11/full-sdk-v11.md
- [ ] web-sdk-integrations/sdk-v11/lite-checkout-sdk-v11.md
- [ ] web-sdk-integrations/sdk-v11/yuno-web-sdk-v11.md
- [ ] web-sdk-integrations/sdk-v12/index.md
- [ ] web-sdk-integrations/sdk-v12/full-sdk-v12.md
- [ ] web-sdk-integrations/sdk-v12/lite-checkout-sdk-v12.md
- [ ] web-sdk-integrations/seamless-sdk-payment-web.md

#### Android SDK integrations
- [ ] android-sdk-integrations/index.md
- [ ] android-sdk-integrations/requirements-android.md
- [ ] android-sdk-integrations/sdk-customizations-android.md
- [ ] android-sdk-integrations/full-checkout-android.md
- [ ] android-sdk-integrations/seamless-sdk-payment-android.md
- [ ] android-sdk-integrations/release-notes-android-sdk.md
- [ ] android-sdk-integrations/alternative-sdks-1/index.md
- [ ] android-sdk-integrations/alternative-sdks-1/headless-sdk-enrollment-android.md
- [ ] android-sdk-integrations/alternative-sdks-1/headless-sdk-payment-android.md
- [ ] android-sdk-integrations/lite-sdk-android/index.md
- [ ] android-sdk-integrations/lite-sdk-android/enrollment-android.md
- [ ] android-sdk-integrations/lite-sdk-android/lite-checkout-android.md
- [ ] android-sdk-integrations/external-browser-callback-android.md

#### iOS SDK integrations
- [ ] ios-sdk-integrations/index.md
- [ ] ios-sdk-integrations/sdk-customizations-ios.md
- [ ] ios-sdk-integrations/full-checkout-ios.md
- [ ] ios-sdk-integrations/seamless-sdk-payment-ios.md
- [ ] ios-sdk-integrations/ios-release-notes.md
- [ ] ios-sdk-integrations/lite-sdk-ios/index.md
- [ ] ios-sdk-integrations/lite-sdk-ios/enrollment-ios.md
- [ ] ios-sdk-integrations/alternative-sdks-2/index.md
- [ ] ios-sdk-integrations/alternative-sdks-2/headless-sdk-enrollment-ios.md
- [ ] ios-sdk-integrations/alternative-sdks-2/headless-sdk-payment-ios.md
- [ ] ios-sdk-integrations/loader-1.md

#### Flutter SDK integration
- [ ] flutter-sdk-integration/sdk-customization.md
- [ ] flutter-sdk-integration/requirements.md
- [ ] flutter-sdk-integration/full-sdk-flutter.md
- [ ] flutter-sdk-integration/seamless-flutter.md
- [ ] flutter-sdk-integration/lite-sdk-flutter/index.md
- [ ] flutter-sdk-integration/lite-sdk-flutter/lite-sdk-enrollment-flutter.md
- [ ] flutter-sdk-integration/lite-sdk-flutter/lite-sdk-payment-flutter.md

#### Build your integration
- [ ] build-your-integration/index.md
- [ ] build-your-integration/secure-fields.md
- [ ] build-your-integration/the-ultimate-checkout-lite.md
- [ ] build-your-integration/full-sdk-workflow.md
- [ ] build-your-integration/seamless-sdk.md
- [ ] build-your-integration/headless-sdk-integration.md
- [ ] build-your-integration/headless-sdk-enrollment-steps.md

#### Cross-SDK pages
- [ ] choose-the-right-integration-for-you.md
- [ ] direct-flow.md
- [ ] complementary-features-full-sdk.md
- [ ] country-coverage-yuno-sdk.md
- [ ] yuno-sdks.md

---

### Per-page actions (apply to each page)
- [ ] Use American English per Technical Writing guide
- [ ] Verify clear title and section hierarchy (H1/H2/H3)
- [ ] Ensure Step 1 includes explicit SDK/library inclusion for the platform
- [ ] Standardize terms: “render mode”, “issuer’s form”, `ContinuePayment` method
- [ ] Replace “Example usage” with “Example” or “Usage”
- [ ] Move parameter explanations from inline comments into titled parameter tables
- [ ] Deduplicate parameter info; link to a single Parameters section if repeated
- [ ] Keep explanations above/below code blocks; avoid inline commentary
- [ ] Adjust `mountCheckout` phrasing to avoid repetition
- [ ] Update credentials phrasing to “See the credentials” with link
- [ ] Place optional/advanced notices at the start of their sections
- [ ] Remove confusing callouts; keep instructions self-contained on the page
- [ ] Validate internal links/anchors and code block formatting

---


