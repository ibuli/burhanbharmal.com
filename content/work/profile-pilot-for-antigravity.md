---
title: Profile Pilot
---

## The problem

During AI-assisted development, account quotas can interrupt a coding session. Changing accounts through a browser adds another step, while quota information can be difficult to keep in view.

I built Profile Pilot to put account switching and quota visibility inside the Antigravity workflow.

## My role

This is an independent, open-source developer tool. I built the extension with TypeScript, JavaScript, and Node.js, with an interface available through the IDE sidebar and status bar.

## What I built

- Up to five local profiles, with one-click switching.
- Quota visibility for the model pools exposed by the tool.
- Session synchronization between the Antigravity IDE and standalone app.
- Support for macOS and Windows.

## Product and engineering considerations

### Keep the next action close

The sidebar and status bar make switching available in the environment where the interruption occurs. The interface combines account selection and quota information so a developer can make that decision in one place.

### Synchronize two environments

Keeping the IDE and standalone app aligned is part of the tool’s scope. This also makes compatibility with both environments an important maintenance concern.

### Keep profiles local

The tool is designed around local profile storage. That keeps the account-management workflow on the developer’s machine. The repository is available for reviewing how the extension works.

## Delivered outcome

Profile Pilot is published in the Visual Studio Marketplace and its source is available on GitHub. The delivered capability is account switching and quota visibility within the development workflow.

[View the extension](https://marketplace.visualstudio.com/items?itemName=BurhanBharmal.antigravity-profile-pilot)

[Read the source](https://github.com/ibuli/antigravity-profile-pilot)

## What this demonstrates

Building a focused developer tool around a specific interruption, connecting a compact interface to local system behavior, and making the implementation available for inspection.

## Original launch notes

The following is the original project introduction, preserved as a record of the launch. It may describe plans or product details from that point in time.

Hey everyone! 👋

When pair-programming with AI agents in Google Antigravity, hitting hourly or weekly quota limits on Gemini 3.7 or Claude 4.6 is a common bottleneck. Switching between accounts used to require full browser re-authentication.

I built Profile Pilot to make account switching completely frictionless:

⚡ Highlights:

1-Click Switching: Store up to 5 profiles and toggle instantly via the sidebar or status bar.

IDE + App Sync: Automatically synchronizes session databases between Antigravity IDE and the standalone Antigravity App.

Live Quota Pools: Track independent remaining percentages for Gemini models & Claude/GPT models.

Cross-Platform: Native support for macOS and Windows.

Privacy-Focused: 100% local, zero telemetry, zero third-party dependencies.

📦 Install from Marketplace:
https://marketplace.visualstudio.com/items?itemName=BurhanBharmal.antigravity-profile-pilot

💻 GitHub Repository:
https://github.com/ibuli/antigravity-profile-pilot

Would love your feedback and feature requests! 🙌
