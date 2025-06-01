---
title: Monitors
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno's monitors feature helps you detect and address payment processing issues in real-time. This tool automatically identifies anomalies in payment provider performance and takes immediate action to maintain optimal approval rates.

You can access the Monitors section from your Yuno dashboard to view and manage payment processing anomalies. The monitoring system helps ensure consistent payment processing and high conversion rates across your payment routes.

## Monitoring process operation

The monitoring process consists of four key steps that help identify and restore payment routes:

1. **Anomaly detection**: The system continuously monitors approval rates over your specified time period. When rates drop below your defined threshold, it triggers alerts through your configured channels like email or Opsgenie.

2. **Alert notification**: If approval rates fall below the threshold, Yuno immediately notifies you through your chosen alert channels.

3. **Traffic redirection**: Upon detecting low approval rates, Yuno automatically redirects payments to your fallback providers. During this process:
   * A small portion of transactions continues through the original provider to monitor for service recovery
   * Redirection continues while the fallback provider maintains better performance
   * If the fallback provider's approval rate drops to match or fall below the original, traffic returns to the initial route

4. **Route recovery**: When the primary provider's approval rate rises above the threshold again, traffic automatically returns to the original route.

This automated process helps maintain optimal payment processing by quickly detecting issues and implementing solutions to keep approval rates high.

### Additional monitoring scenarios

The monitor feature handles various payment route scenarios to maintain optimal processing. Here's how it manages specific situations:

Provider interruptions:

* When a provider has interruptions, traffic automatically redirects to the configured fallback provider
* If the fallback provider experiences issues, traffic moves to a second fallback provider (if configured)
* When all providers are unavailable, traffic routes to the provider with the highest recent approval rate
* The system continuously monitors providers and dynamically adjusts traffic for optimal approval rates
* Provider status (down/recovered) is determined by your configuration settings

Traffic redirection sequence:

1. When a provider drops below the approval threshold, traffic redirects to the fallback provider
2. If the fallback provider also drops below threshold, traffic moves to the second fallback (if available) 
3. If all providers are below threshold, traffic routes to whichever provider has the highest approval rate

The diagram below illustrates these traffic redirection scenarios:

<Image align="center" src="https://files.readme.io/35125f14b87e13ec56db5c6d5e013af5d42eca8294f65edcabb7ca2da4cf4855-Diagrama_-_Routing_alert.png" />

## Configure a monitor

To configure a monitor for your payment routes:

1. Go to the **Routing** tab in your dashboard and open an existing route. You can set up different approval rate monitors for each condition.

2. Customize your payment route with your preferred settings.

3. Add the necessary conditions and payment providers for each set.

4. Click the Monitors icon (bell) and configure these settings:

   * **Time frame**: Set how long to measure the approval rate
   * **Approval rate limit**: Set the threshold that triggers alerts and actions
   * **Number of payments**: Set minimum, maximum, or range of payments needed to trigger the condition. This prevents redirects from anomalies during low payment volumes
   * **Alert channels**: Choose email or Opsgenie notifications
   * **Automatic traffic redistribution**: Enable automatic redirection when alerts trigger. Requires a fallback provider for **Error** and **Pause** conditions
   * **Percentage of traffic**: Set how much traffic stays with the original provider for monitoring

5. Save the monitor changes, or save it as a template for future usage.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/monitor_v2.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <div class="contentContainer">
        <p>
					You can't create a monitor in published routes. 
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>
