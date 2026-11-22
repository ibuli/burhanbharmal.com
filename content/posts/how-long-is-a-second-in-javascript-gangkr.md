---
title: How long is a second in JavaScript?
description: >-
  Time in Javascript can be complex since its timekeeping (based on POSIX time)
  differs from Coordinated Universal Time (UTC). POSIX time ignores leap
  seconds, simplifying calculations but causing inaccuracies in applications
  that n
topic: Shared reading
status: published
order: 15888
date: '2025-01-28'
---

Time in Javascript can be complex since its timekeeping (based on POSIX time) differs from Coordinated Universal Time (UTC). POSIX time ignores leap seconds, simplifying calculations but causing inaccuracies in applications that need precise time synchronization, unlike UTC, which incorporates leap seconds to align with Earth's rotation. Two methods for handling leap seconds within POSIX systems are "step adjustment" (abruptly shifting time) and "smearing" (gradually distributing the adjustment).

Read more here: [https://docs.timetime.in/blog/how-long-is-a-second-in-js/](https://docs.timetime.in/blog/how-long-is-a-second-in-js/)

Via: TLDR Web Dev
