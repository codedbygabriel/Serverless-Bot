# Serverless Bot

> Usually students often needs a discord group chat to create topics, voice channels, study groups etca. This bot aims towards that.

## Current commands.

> Prefix: /

- presentation (A simple command, meant to explain the usages of the bot.)
- starter_kit (A channel/text initializer, creates the agnostic side of the bot.)
- create_channel (Creates a temporary channel {defaults to an hour}, needs name and students count.)

## Goals / Future commands.

- [x] create_channel -> (A command to create a voice channel with a specific number of students);
- [x] added restraints to avoid user errors e.g.: wrong text channel; wrong range of users for a voice channel;
- [x] a initializer, helping becoming really server agnostic. (done with: starter_kit.js)
- [x] voice channels with duration (timeout)

