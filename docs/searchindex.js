Object.assign(window.search, {
  doc_urls: [
    '1.welcome.html#-teams-sdk-documentation',
    '2.basics/index.html#basics',
    '2.basics/1.on-activity.html#-listening-to-activities',
    '2.basics/2.on-message.html#-listening-to-message-activities',
    '2.basics/3.sending-activities.html#-sending-activities',
    '2.basics/4.on-event.html#-listening-to-events',
    '2.basics/5.api.html#using-the-api-client',
    '2.basics/6.auth.html#--user-authentication',
    '3.dialogs.html#--dialogs-task-modules',
    '3.dialogs.html#teamssdkcards',
    '3.dialogs.html#dialogopen-taskfetch',
    '3.dialogs.html#dialogsubmit-tasksubmit',
    '3.dialogs.html#docs',
    '4.message-extensions.html#--message-extensions',
  ],
  index: {
    documentStore: {
      docInfo: {
        0: { body: 19, breadcrumbs: 4, title: 3 },
        1: { body: 0, breadcrumbs: 2, title: 1 },
        10: { body: 32, breadcrumbs: 5, title: 2 },
        11: { body: 21, breadcrumbs: 5, title: 2 },
        12: { body: 3, breadcrumbs: 4, title: 1 },
        13: { body: 37, breadcrumbs: 4, title: 2 },
        2: { body: 27, breadcrumbs: 5, title: 2 },
        3: { body: 29, breadcrumbs: 6, title: 3 },
        4: { body: 23, breadcrumbs: 5, title: 2 },
        5: { body: 51, breadcrumbs: 5, title: 2 },
        6: { body: 26, breadcrumbs: 7, title: 3 },
        7: { body: 52, breadcrumbs: 5, title: 2 },
        8: { body: 5, breadcrumbs: 6, title: 3 },
        9: { body: 40, breadcrumbs: 4, title: 1 },
      },
      docs: {
        0: {
          body: 'Microsoft Teams is a feature rich messaging platform. It provides features that developers can use to create immersive app experiences, below are some of the different features that can be used with this SDK.',
          breadcrumbs: 'Welcome » 📖 Teams SDK: Documentation',
          id: '0',
          title: '📖 Teams SDK: Documentation',
        },
        1: { body: '', breadcrumbs: 'Basics » Basics', id: '1', title: 'Basics' },
        10: {
          body: "triggered when a dialog is opened, used to render dialog contents. Example: when a dialog is opened, render an Adaptive Card as the body. app.on('dialog.open', ({ }) => { return { status: 200, body: { task: { type: 'continue', value: { width: 'large', card: cardAttachment('adaptive', { type: 'AdaptiveCard', version: '1.6', body: [...] }) } } } };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » dialog.open (task/fetch)',
          id: '10',
          title: 'dialog.open (task/fetch)',
        },
        11: {
          body: "triggered when a dialog is submitted, used to handle logic before closing the dialog. Example: when a dialog is submitted, do some custom logic and do not render anything else. app.on('dialog.submit', ({}) => { // ... some logic return { status: 200 };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » dialog.submit (task/submit)',
          id: '11',
          title: 'dialog.submit (task/submit)',
        },
        12: {
          body: 'Invoking Task Modules',
          breadcrumbs: 'Dialogs (Task Modules) » Docs',
          id: '12',
          title: 'Docs',
        },
        13: {
          body: 'Message extensions (or Compose Extensions) enable users to engage with your web service through buttons and forms within the Microsoft Teams client. Users can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. The results of these interactions can be returned to the Teams client as a richly formatted card.',
          breadcrumbs: 'Message Extensions » 📖 Message Extensions',
          id: '13',
          title: '📖 Message Extensions',
        },
        2: {
          body: "To listen/subscribe to different activity types, you can use the on() method. Handlers will be called in the order they are added. Example: an echo bot that listens for messages sent to it and responds. app.on('message', async ({ activity, send }) => { await send({ type: 'message', text: `you said: \"${activity.text}\"` });\n});",
          breadcrumbs: 'Basics » Listening To Activities » 👂 Listening To Activities',
          id: '2',
          title: '👂 Listening To Activities',
        },
        3: {
          body: "You can listen/subscribe to messages using static text or Regexp. Example: when the user sends a message to the bot with the text /logout we send a message back. app.message('/logout', async ({ activity, send }) => { await send({ type: 'message', text: 'ok, I\\'ll sign you out!' });\n});",
          breadcrumbs: 'Basics » Listening To Messages » 👂 Listening To Message Activities',
          id: '3',
          title: '👂 Listening To Message Activities',
        },
        4: {
          body: "To send an activity you can either use the send or reply methods. Example: an echo bot that listens for messages sent to it and responds. app.on('message', async ({ activity, reply }) => { await reply({ type: 'message', text: `you said: \"${activity.text}\"` });\n});",
          breadcrumbs: 'Basics » Sending Activities » 💬 Sending Activities',
          id: '4',
          title: '💬 Sending Activities',
        },
        5: {
          body: "To listen/subscribe to different event types, you can use the event() method. Handlers will be called in the order they are added. Example: We subscribe to errors that occur in the app. app.event('error', ({ err, log }) => { log.error(err);\n}); Example: When a user signs in using OAuth or SSO, use the graph api to fetch their profile and say hello. app.event('signin', async ({ activity, tokenResponse, send }) => { const msgraph = graph(tokenResponse.token); const me: MSGraph.User = await msgraph.api('/me').get(); await send({ type: 'message', text: `👋 Hello ${me.name}`, });\n});",
          breadcrumbs: 'Basics » Listening To Events » 👂 Listening To Events',
          id: '5',
          title: '👂 Listening To Events',
        },
        6: {
          body: "an instance of the web api client is passed to handlers that can be used to fetch team/meeting/conversation/etc... details. Example: we use the api client to fetch the conversations array of members. app.on('message', async ({ activity, api }) => { const members = await api.conversations.members(activity.conversation.id).get();\n});",
          breadcrumbs: 'Basics » Using The API Client » Using the API Client',
          id: '6',
          title: 'Using the API Client',
        },
        7: {
          body: "Prompting the user to sign in using an OAuth connection has never been easier! Just use the signin method to send the request and the listen to the signin event to handle the token result. app.on('message', async ({ signin, send }) => { const state = {}; // ... fetch some state if (!state.authenticated) { await send({ type: 'message', text: 'please sign in so I can help you...' }); await signin('connection-name'); return; } await send({ type: 'message', text: 'you are already signed in!' });\n}); app.event('signin', async ({ tokenResponse }) => { // do something with the token...\n});",
          breadcrumbs: 'Basics » User Authentication » 📖 User Authentication',
          id: '7',
          title: '📖 User Authentication',
        },
        8: {
          body: 'Modal dialogs in Teams for rich interaction.',
          breadcrumbs: 'Dialogs (Task Modules) » 📖 Dialogs (Task Modules)',
          id: '8',
          title: '📖 Dialogs (Task Modules)',
        },
        9: {
          body: "dialogs can be opened from teams by using an Adaptive Card Action.Submit . Example: by adding msteams: { type: 'task/fetch' } to the action.data we tell the teams client to open a dialog on click. const card: Card = { type: 'AdaptiveCard', version: '1.6', body: [...], actions: [ { id: 'hello-world', type: 'Action.Submit', title: 'Hello World', data: { msteams: { type: 'task/fetch' } } } ]\n};",
          breadcrumbs: 'Dialogs (Task Modules) » @teams.sdk/cards',
          id: '9',
          title: '@teams.sdk/cards',
        },
      },
      length: 14,
      save: true,
    },
    fields: ['title', 'body', 'breadcrumbs'],
    index: {
      body: {
        root: {
          1: {
            '.': { 6: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          2: {
            0: { 0: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          a: {
            c: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '.': {
                        d: {
                          a: {
                            df: 0,
                            docs: {},
                            t: { a: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                i: {
                                  df: 0,
                                  docs: {},
                                  t: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 2,
                      docs: { 13: { tf: 1.0 }, 9: { tf: 1.0 } },
                    },
                  },
                  v: {
                    df: 5,
                    docs: {
                      2: { tf: 1.7320508075688772 },
                      3: { tf: 1.4142135623730951 },
                      4: { tf: 1.7320508075688772 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                    },
                    i: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          '.': {
                            df: 0,
                            docs: {},
                            t: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                x: {
                                  df: 0,
                                  docs: {},
                                  t: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
              },
            },
            d: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      v: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            a: {
                              df: 0,
                              docs: {},
                              r: {
                                d: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } },
                                df: 0,
                                docs: {},
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
              },
              df: 3,
              docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 }, 9: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            l: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  a: {
                    d: { df: 0, docs: {}, i: { df: 1, docs: { 7: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: {
                '.': {
                  c: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        v: {
                          df: 0,
                          docs: {},
                          e: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              s: {
                                a: {
                                  df: 0,
                                  docs: {},
                                  t: {
                                    df: 0,
                                    docs: {},
                                    i: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          df: 0,
                                          docs: {},
                                          s: {
                                            '.': {
                                              df: 0,
                                              docs: {},
                                              m: {
                                                df: 0,
                                                docs: {},
                                                e: {
                                                  df: 0,
                                                  docs: {},
                                                  m: {
                                                    b: {
                                                      df: 0,
                                                      docs: {},
                                                      e: {
                                                        df: 0,
                                                        docs: {},
                                                        r: {
                                                          df: 0,
                                                          docs: {},
                                                          s: {
                                                            '(': {
                                                              a: {
                                                                c: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  t: {
                                                                    df: 0,
                                                                    docs: {},
                                                                    i: {
                                                                      df: 0,
                                                                      docs: {},
                                                                      v: {
                                                                        df: 0,
                                                                        docs: {},
                                                                        i: {
                                                                          df: 0,
                                                                          docs: {},
                                                                          t: {
                                                                            df: 0,
                                                                            docs: {},
                                                                            y: {
                                                                              '.': {
                                                                                c: {
                                                                                  df: 0,
                                                                                  docs: {},
                                                                                  o: {
                                                                                    df: 0,
                                                                                    docs: {},
                                                                                    n: {
                                                                                      df: 0,
                                                                                      docs: {},
                                                                                      v: {
                                                                                        df: 0,
                                                                                        docs: {},
                                                                                        e: {
                                                                                          df: 0,
                                                                                          docs: {},
                                                                                          r: {
                                                                                            df: 0,
                                                                                            docs: {},
                                                                                            s: {
                                                                                              a: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                t: {
                                                                                                  df: 0,
                                                                                                  docs: {},
                                                                                                  i: {
                                                                                                    df: 0,
                                                                                                    docs: {},
                                                                                                    o: {
                                                                                                      df: 0,
                                                                                                      docs: {},
                                                                                                      n: {
                                                                                                        '.': {
                                                                                                          df: 0,
                                                                                                          docs: {},
                                                                                                          i: {
                                                                                                            d: {
                                                                                                              ')': {
                                                                                                                '.': {
                                                                                                                  df: 0,
                                                                                                                  docs: {},
                                                                                                                  g: {
                                                                                                                    df: 0,
                                                                                                                    docs: {},
                                                                                                                    e: {
                                                                                                                      df: 0,
                                                                                                                      docs: {},
                                                                                                                      t: {
                                                                                                                        df: 1,
                                                                                                                        docs: {
                                                                                                                          6: {
                                                                                                                            tf: 1.0,
                                                                                                                          },
                                                                                                                        },
                                                                                                                      },
                                                                                                                    },
                                                                                                                  },
                                                                                                                },
                                                                                                                df: 0,
                                                                                                                docs: {},
                                                                                                              },
                                                                                                              df: 0,
                                                                                                              docs: {},
                                                                                                            },
                                                                                                            df: 0,
                                                                                                            docs: {},
                                                                                                          },
                                                                                                        },
                                                                                                        df: 0,
                                                                                                        docs: {},
                                                                                                      },
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                            },
                                                                                          },
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                  },
                                                                                },
                                                                                df: 0,
                                                                                docs: {},
                                                                              },
                                                                              df: 0,
                                                                              docs: {},
                                                                            },
                                                                          },
                                                                        },
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                                df: 0,
                                                                docs: {},
                                                              },
                                                              df: 0,
                                                              docs: {},
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                df: 2,
                docs: { 5: { tf: 1.0 }, 6: { tf: 2.0 } },
              },
              p: {
                '.': {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    v: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          t: {
                            '(': {
                              "'": {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    r: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        r: { df: 1, docs: { 5: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                s: {
                                  df: 0,
                                  docs: {},
                                  i: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        i: {
                                          df: 0,
                                          docs: {},
                                          n: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        s: {
                          a: {
                            df: 0,
                            docs: {},
                            g: {
                              df: 0,
                              docs: {},
                              e: {
                                '(': {
                                  "'": {
                                    '/': {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          g: {
                                            df: 0,
                                            docs: {},
                                            o: {
                                              df: 0,
                                              docs: {},
                                              u: {
                                                df: 0,
                                                docs: {},
                                                t: { df: 1, docs: { 3: { tf: 1.0 } } },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          d: {
                            df: 0,
                            docs: {},
                            i: {
                              a: {
                                df: 0,
                                docs: {},
                                l: {
                                  df: 0,
                                  docs: {},
                                  o: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      '.': {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          p: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              df: 0,
                                              docs: {},
                                              n: { df: 1, docs: { 10: { tf: 1.0 } } },
                                            },
                                          },
                                        },
                                        s: {
                                          df: 0,
                                          docs: {},
                                          u: {
                                            b: {
                                              df: 0,
                                              docs: {},
                                              m: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  df: 0,
                                                  docs: {},
                                                  t: { df: 1, docs: { 11: { tf: 1.0 } } },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          df: 0,
                          docs: {},
                          m: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              s: {
                                df: 0,
                                docs: {},
                                s: {
                                  a: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 4,
                                      docs: {
                                        2: { tf: 1.0 },
                                        4: { tf: 1.0 },
                                        6: { tf: 1.0 },
                                        7: { tf: 1.0 },
                                      },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 2,
                docs: { 0: { tf: 1.0 }, 5: { tf: 1.0 } },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: { a: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
              r: {
                a: { df: 0, docs: {}, y: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            s: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                n: {
                  c: {
                    df: 6,
                    docs: {
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.4142135623730951 },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                  },
                },
              },
            },
            w: {
              a: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 6,
                    docs: {
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.4142135623730951 },
                      6: { tf: 1.0 },
                      7: { tf: 1.7320508075688772 },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          b: {
            a: {
              c: { df: 0, docs: {}, k: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: { c: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, r: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, w: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                i: { df: 2, docs: { 10: { tf: 1.7320508075688772 }, 9: { tf: 1.0 } } },
              },
              df: 0,
              docs: {},
              t: { df: 3, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 } } },
              x: { df: 1, docs: { 13: { tf: 1.0 } } },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 2, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 } } } },
              r: {
                d: {
                  a: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      t: {
                        a: {
                          c: {
                            df: 0,
                            docs: {},
                            h: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      '(': {
                                        "'": {
                                          a: {
                                            d: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                p: {
                                                  df: 0,
                                                  docs: {},
                                                  t: { df: 1, docs: { 10: { tf: 1.0 } } },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                        df: 0,
                                        docs: {},
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 3,
                  docs: {
                    10: { tf: 1.4142135623730951 },
                    13: { tf: 1.0 },
                    9: { tf: 1.7320508075688772 },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            l: {
              df: 0,
              docs: {},
              i: {
                c: { df: 0, docs: {}, k: { df: 1, docs: { 9: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 3,
                      docs: {
                        13: { tf: 1.4142135623730951 },
                        6: { tf: 1.7320508075688772 },
                        9: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    n: { d: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 13: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 4,
                    docs: {
                      5: { tf: 1.4142135623730951 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                      9: { tf: 1.0 },
                    },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 10: { tf: 1.0 } } } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 10: { tf: 1.0 } } } },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            u: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 11: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            a: { df: 0, docs: {}, t: { a: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, p: { df: 1, docs: { 0: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: {
              a: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    g: {
                      '.': {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            e: { df: 0, docs: {}, n: { df: 1, docs: { 10: { tf: 1.0 } } } },
                          },
                        },
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 4,
                      docs: {
                        10: { tf: 1.7320508075688772 },
                        11: { tf: 1.7320508075688772 },
                        8: { tf: 1.4142135623730951 },
                        9: { tf: 1.4142135623730951 },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 3, docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 }, 5: { tf: 1.0 } } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              c: {
                df: 1,
                docs: { 12: { tf: 1.0 } },
                u: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          df: 0,
          docs: {},
          e: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
            },
            c: {
              df: 0,
              docs: {},
              h: { df: 0, docs: {}, o: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 13: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 13: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              r: {
                df: 1,
                docs: { 5: { tf: 1.0 } },
                o: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
            },
            v: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: { df: 2, docs: { 5: { tf: 1.7320508075688772 }, 7: { tf: 1.0 } } },
                },
              },
            },
            x: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 8,
                      docs: {
                        10: { tf: 1.0 },
                        11: { tf: 1.0 },
                        2: { tf: 1.0 },
                        3: { tf: 1.0 },
                        4: { tf: 1.0 },
                        5: { tf: 1.4142135623730951 },
                        6: { tf: 1.0 },
                        9: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, i: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 13: { tf: 1.7320508075688772 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          f: {
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, r: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } } },
                },
              },
              df: 0,
              docs: {},
              t: {
                c: {
                  df: 0,
                  docs: {},
                  h: {
                    df: 3,
                    docs: { 5: { tf: 1.0 }, 6: { tf: 1.4142135623730951 }, 7: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 13: { tf: 1.0 } },
                },
              },
            },
          },
          g: {
            df: 0,
            docs: {},
            r: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  h: {
                    '(': {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          k: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                r: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      p: {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          n: {
                                            df: 0,
                                            docs: {},
                                            s: {
                                              df: 0,
                                              docs: {},
                                              e: {
                                                '.': {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 0,
                                                    docs: {},
                                                    o: {
                                                      df: 0,
                                                      docs: {},
                                                      k: {
                                                        df: 0,
                                                        docs: {},
                                                        e: {
                                                          df: 0,
                                                          docs: {},
                                                          n: { df: 1, docs: { 5: { tf: 1.0 } } },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    df: 1,
                    docs: { 5: { tf: 1.0 } },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          h: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 2,
                    docs: { 11: { tf: 1.0 }, 7: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 3, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 }, 6: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 2,
                    docs: { 5: { tf: 1.4142135623730951 }, 9: { tf: 1.4142135623730951 } },
                  },
                },
                p: { df: 1, docs: { 7: { tf: 1.0 } } },
              },
            },
          },
          i: {
            '\\': {
              "'": {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, l: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            d: { df: 1, docs: { 9: { tf: 1.0 } } },
            df: 0,
            docs: {},
            m: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
              },
              s: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    n: { c: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    a: {
                      c: {
                        df: 0,
                        docs: {},
                        t: { df: 2, docs: { 13: { tf: 1.0 }, 8: { tf: 1.0 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, k: { df: 1, docs: { 12: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 10: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            i: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      '/': {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              s: {
                                c: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    i: {
                                      b: {
                                        df: 3,
                                        docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 5,
                      docs: {
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 1.0 },
                        4: { tf: 1.0 },
                        5: { tf: 1.0 },
                        7: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              g: {
                '.': {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          r: {
                            '(': {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                r: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                },
                df: 1,
                docs: { 5: { tf: 1.0 } },
                i: { c: { df: 1, docs: { 11: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                o: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
                },
              },
            },
          },
          m: {
            df: 0,
            docs: {},
            e: {
              '.': {
                df: 0,
                docs: {},
                n: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 5: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              m: {
                b: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  a: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 7,
                      docs: {
                        0: { tf: 1.0 },
                        13: { tf: 2.0 },
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 2.23606797749979 },
                        4: { tf: 1.4142135623730951 },
                        5: { tf: 1.0 },
                        7: { tf: 1.4142135623730951 },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      df: 4,
                      docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 }, 5: { tf: 1.0 }, 7: { tf: 1.0 } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        f: {
                          df: 0,
                          docs: {},
                          t: { df: 2, docs: { 0: { tf: 1.0 }, 13: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            o: {
              d: {
                a: { df: 0, docs: {}, l: { df: 1, docs: { 8: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 2, docs: { 12: { tf: 1.0 }, 8: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            s: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                r: {
                  a: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      h: {
                        '.': {
                          a: {
                            df: 0,
                            docs: {},
                            p: {
                              df: 0,
                              docs: {},
                              i: {
                                '(': {
                                  "'": {
                                    '/': {
                                      df: 0,
                                      docs: {},
                                      m: {
                                        df: 0,
                                        docs: {},
                                        e: {
                                          "'": {
                                            ')': {
                                              '.': {
                                                df: 0,
                                                docs: {},
                                                g: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    df: 0,
                                                    docs: {},
                                                    t: { df: 1, docs: { 5: { tf: 1.0 } } },
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                          u: { df: 0, docs: {}, s: { df: 1, docs: { 5: { tf: 1.0 } } } },
                        },
                        df: 1,
                        docs: { 5: { tf: 1.0 } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
          },
          n: {
            a: { df: 0, docs: {}, m: { df: 0, docs: {}, e: { df: 1, docs: { 7: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              v: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } },
              },
            },
          },
          o: {
            a: {
              df: 0,
              docs: {},
              u: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } } },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 3: { tf: 1.0 } } },
            p: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                n: {
                  df: 2,
                  docs: { 10: { tf: 1.4142135623730951 }, 9: { tf: 1.4142135623730951 } },
                },
              },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 2, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
          },
          p: {
            a: { df: 0, docs: {}, s: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            l: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: { df: 0, docs: {}, m: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 5: { tf: 1.0 } } } },
                },
                m: {
                  df: 0,
                  docs: {},
                  p: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
                v: {
                  df: 0,
                  docs: {},
                  i: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
                },
              },
            },
          },
          r: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  x: { df: 0, docs: {}, p: { df: 1, docs: { 3: { tf: 1.0 } } } },
                },
              },
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 2, docs: { 10: { tf: 1.4142135623730951 }, 11: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
              },
              p: {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, i: { df: 1, docs: { 4: { tf: 1.7320508075688772 } } } },
              },
              q: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: { d: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 2, docs: { 13: { tf: 1.0 }, 7: { tf: 1.0 } } } },
                },
              },
              t: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 4,
                      docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 13: { tf: 1.0 }, 7: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 2,
                  docs: { 0: { tf: 1.0 }, 8: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
              df: 0,
              docs: {},
            },
          },
          s: {
            d: { df: 0, docs: {}, k: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } } },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                r: {
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 5,
                  docs: {
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 2.0 },
                    4: { tf: 1.7320508075688772 },
                    5: { tf: 1.4142135623730951 },
                    7: { tf: 2.0 },
                  },
                },
                df: 0,
                docs: {},
                t: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                n: {
                  df: 3,
                  docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 }, 7: { tf: 1.7320508075688772 } },
                  i: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          c: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                n: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 7: { tf: 1.7320508075688772 } },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  t: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
            },
            s: { df: 0, docs: {}, o: { df: 1, docs: { 5: { tf: 1.0 } } } },
            t: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    '.': {
                      a: {
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            h: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 7: { tf: 1.4142135623730951 } },
                  },
                  i: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
                  u: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } },
                },
              },
              df: 0,
              docs: {},
            },
            u: {
              b: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } } },
                },
                s: {
                  c: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: { b: { df: 1, docs: { 5: { tf: 1.0 } } }, df: 0, docs: {} },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
            },
            y: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          t: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                k: {
                  '/': {
                    df: 0,
                    docs: {},
                    f: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        t: {
                          c: {
                            df: 0,
                            docs: {},
                            h: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.4142135623730951 } } },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                    s: {
                      df: 0,
                      docs: {},
                      u: {
                        b: {
                          df: 0,
                          docs: {},
                          m: {
                            df: 0,
                            docs: {},
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 3,
                  docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 }, 8: { tf: 1.0 } },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                m: {
                  '/': {
                    df: 0,
                    docs: {},
                    m: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            i: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                g: {
                                  '/': {
                                    c: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          df: 0,
                                          docs: {},
                                          v: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              df: 0,
                                              docs: {},
                                              r: {
                                                df: 0,
                                                docs: {},
                                                s: {
                                                  a: {
                                                    df: 0,
                                                    docs: {},
                                                    t: {
                                                      df: 0,
                                                      docs: {},
                                                      i: {
                                                        df: 0,
                                                        docs: {},
                                                        o: {
                                                          df: 0,
                                                          docs: {},
                                                          n: {
                                                            '/': {
                                                              df: 0,
                                                              docs: {},
                                                              e: {
                                                                df: 0,
                                                                docs: {},
                                                                t: {
                                                                  c: {
                                                                    df: 1,
                                                                    docs: { 6: { tf: 1.0 } },
                                                                  },
                                                                  df: 0,
                                                                  docs: {},
                                                                },
                                                              },
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  df: 0,
                                                  docs: {},
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  df: 4,
                  docs: {
                    0: { tf: 1.4142135623730951 },
                    13: { tf: 1.4142135623730951 },
                    8: { tf: 1.0 },
                    9: { tf: 1.4142135623730951 },
                  },
                  s: {
                    '.': {
                      df: 0,
                      docs: {},
                      s: {
                        d: {
                          df: 0,
                          docs: {},
                          k: {
                            '/': {
                              c: {
                                a: {
                                  df: 0,
                                  docs: {},
                                  r: { d: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} },
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.0 } } } },
              x: {
                df: 0,
                docs: {},
                t: {
                  df: 5,
                  docs: {
                    2: { tf: 1.0 },
                    3: { tf: 1.7320508075688772 },
                    4: { tf: 1.0 },
                    5: { tf: 1.0 },
                    7: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            h: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: { df: 0, docs: {}, t: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.0 } } } } },
            o: {
              df: 0,
              docs: {},
              k: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 1,
                    docs: { 7: { tf: 1.4142135623730951 } },
                    r: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                s: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            y: {
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 7,
                  docs: {
                    10: { tf: 1.4142135623730951 },
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                    4: { tf: 1.0 },
                    5: { tf: 1.4142135623730951 },
                    7: { tf: 1.4142135623730951 },
                    9: { tf: 2.0 },
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 10,
              docs: {
                0: { tf: 1.4142135623730951 },
                10: { tf: 1.0 },
                11: { tf: 1.0 },
                2: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
                5: { tf: 1.7320508075688772 },
                6: { tf: 1.7320508075688772 },
                7: { tf: 1.4142135623730951 },
                9: { tf: 1.0 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    13: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                    5: { tf: 1.0 },
                    7: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
          },
          v: {
            a: { df: 0, docs: {}, l: { df: 0, docs: {}, u: { df: 1, docs: { 10: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, n: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            df: 0,
            docs: {},
            e: { b: { df: 2, docs: { 13: { tf: 1.0 }, 6: { tf: 1.0 } } }, df: 0, docs: {} },
            i: {
              d: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 10: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } }, df: 0, docs: {} },
              },
            },
          },
        },
      },
      breadcrumbs: {
        root: {
          1: {
            '.': { 6: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          2: {
            0: { 0: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          a: {
            c: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '.': {
                        d: {
                          a: {
                            df: 0,
                            docs: {},
                            t: { a: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                i: {
                                  df: 0,
                                  docs: {},
                                  t: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 2,
                      docs: { 13: { tf: 1.0 }, 9: { tf: 1.0 } },
                    },
                  },
                  v: {
                    df: 5,
                    docs: {
                      2: { tf: 2.23606797749979 },
                      3: { tf: 1.7320508075688772 },
                      4: { tf: 2.23606797749979 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                    },
                    i: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          '.': {
                            df: 0,
                            docs: {},
                            t: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                x: {
                                  df: 0,
                                  docs: {},
                                  t: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
              },
            },
            d: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      v: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            a: {
                              df: 0,
                              docs: {},
                              r: {
                                d: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } },
                                df: 0,
                                docs: {},
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
              },
              df: 3,
              docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 }, 9: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            l: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  a: {
                    d: { df: 0, docs: {}, i: { df: 1, docs: { 7: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: {
                '.': {
                  c: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        v: {
                          df: 0,
                          docs: {},
                          e: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              s: {
                                a: {
                                  df: 0,
                                  docs: {},
                                  t: {
                                    df: 0,
                                    docs: {},
                                    i: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          df: 0,
                                          docs: {},
                                          s: {
                                            '.': {
                                              df: 0,
                                              docs: {},
                                              m: {
                                                df: 0,
                                                docs: {},
                                                e: {
                                                  df: 0,
                                                  docs: {},
                                                  m: {
                                                    b: {
                                                      df: 0,
                                                      docs: {},
                                                      e: {
                                                        df: 0,
                                                        docs: {},
                                                        r: {
                                                          df: 0,
                                                          docs: {},
                                                          s: {
                                                            '(': {
                                                              a: {
                                                                c: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  t: {
                                                                    df: 0,
                                                                    docs: {},
                                                                    i: {
                                                                      df: 0,
                                                                      docs: {},
                                                                      v: {
                                                                        df: 0,
                                                                        docs: {},
                                                                        i: {
                                                                          df: 0,
                                                                          docs: {},
                                                                          t: {
                                                                            df: 0,
                                                                            docs: {},
                                                                            y: {
                                                                              '.': {
                                                                                c: {
                                                                                  df: 0,
                                                                                  docs: {},
                                                                                  o: {
                                                                                    df: 0,
                                                                                    docs: {},
                                                                                    n: {
                                                                                      df: 0,
                                                                                      docs: {},
                                                                                      v: {
                                                                                        df: 0,
                                                                                        docs: {},
                                                                                        e: {
                                                                                          df: 0,
                                                                                          docs: {},
                                                                                          r: {
                                                                                            df: 0,
                                                                                            docs: {},
                                                                                            s: {
                                                                                              a: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                t: {
                                                                                                  df: 0,
                                                                                                  docs: {},
                                                                                                  i: {
                                                                                                    df: 0,
                                                                                                    docs: {},
                                                                                                    o: {
                                                                                                      df: 0,
                                                                                                      docs: {},
                                                                                                      n: {
                                                                                                        '.': {
                                                                                                          df: 0,
                                                                                                          docs: {},
                                                                                                          i: {
                                                                                                            d: {
                                                                                                              ')': {
                                                                                                                '.': {
                                                                                                                  df: 0,
                                                                                                                  docs: {},
                                                                                                                  g: {
                                                                                                                    df: 0,
                                                                                                                    docs: {},
                                                                                                                    e: {
                                                                                                                      df: 0,
                                                                                                                      docs: {},
                                                                                                                      t: {
                                                                                                                        df: 1,
                                                                                                                        docs: {
                                                                                                                          6: {
                                                                                                                            tf: 1.0,
                                                                                                                          },
                                                                                                                        },
                                                                                                                      },
                                                                                                                    },
                                                                                                                  },
                                                                                                                },
                                                                                                                df: 0,
                                                                                                                docs: {},
                                                                                                              },
                                                                                                              df: 0,
                                                                                                              docs: {},
                                                                                                            },
                                                                                                            df: 0,
                                                                                                            docs: {},
                                                                                                          },
                                                                                                        },
                                                                                                        df: 0,
                                                                                                        docs: {},
                                                                                                      },
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                            },
                                                                                          },
                                                                                        },
                                                                                      },
                                                                                    },
                                                                                  },
                                                                                },
                                                                                df: 0,
                                                                                docs: {},
                                                                              },
                                                                              df: 0,
                                                                              docs: {},
                                                                            },
                                                                          },
                                                                        },
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                                df: 0,
                                                                docs: {},
                                                              },
                                                              df: 0,
                                                              docs: {},
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                df: 2,
                docs: { 5: { tf: 1.0 }, 6: { tf: 2.449489742783178 } },
              },
              p: {
                '.': {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    v: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          t: {
                            '(': {
                              "'": {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    r: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        r: { df: 1, docs: { 5: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                s: {
                                  df: 0,
                                  docs: {},
                                  i: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        i: {
                                          df: 0,
                                          docs: {},
                                          n: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        s: {
                          a: {
                            df: 0,
                            docs: {},
                            g: {
                              df: 0,
                              docs: {},
                              e: {
                                '(': {
                                  "'": {
                                    '/': {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          g: {
                                            df: 0,
                                            docs: {},
                                            o: {
                                              df: 0,
                                              docs: {},
                                              u: {
                                                df: 0,
                                                docs: {},
                                                t: { df: 1, docs: { 3: { tf: 1.0 } } },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          d: {
                            df: 0,
                            docs: {},
                            i: {
                              a: {
                                df: 0,
                                docs: {},
                                l: {
                                  df: 0,
                                  docs: {},
                                  o: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      '.': {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          p: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              df: 0,
                                              docs: {},
                                              n: { df: 1, docs: { 10: { tf: 1.0 } } },
                                            },
                                          },
                                        },
                                        s: {
                                          df: 0,
                                          docs: {},
                                          u: {
                                            b: {
                                              df: 0,
                                              docs: {},
                                              m: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  df: 0,
                                                  docs: {},
                                                  t: { df: 1, docs: { 11: { tf: 1.0 } } },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          df: 0,
                          docs: {},
                          m: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              s: {
                                df: 0,
                                docs: {},
                                s: {
                                  a: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 4,
                                      docs: {
                                        2: { tf: 1.0 },
                                        4: { tf: 1.0 },
                                        6: { tf: 1.0 },
                                        7: { tf: 1.0 },
                                      },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 2,
                docs: { 0: { tf: 1.0 }, 5: { tf: 1.0 } },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: { a: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
              r: {
                a: { df: 0, docs: {}, y: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            s: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                n: {
                  c: {
                    df: 6,
                    docs: {
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.4142135623730951 },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.7320508075688772 } } } },
                  },
                },
              },
            },
            w: {
              a: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 6,
                    docs: {
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.4142135623730951 },
                      6: { tf: 1.0 },
                      7: { tf: 1.7320508075688772 },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          b: {
            a: {
              c: { df: 0, docs: {}, k: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: {
                  c: {
                    df: 7,
                    docs: {
                      1: { tf: 1.7320508075688772 },
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, r: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, w: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                i: { df: 2, docs: { 10: { tf: 1.7320508075688772 }, 9: { tf: 1.0 } } },
              },
              df: 0,
              docs: {},
              t: { df: 3, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 } } },
              x: { df: 1, docs: { 13: { tf: 1.0 } } },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 2, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 } } } },
              r: {
                d: {
                  a: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      t: {
                        a: {
                          c: {
                            df: 0,
                            docs: {},
                            h: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      '(': {
                                        "'": {
                                          a: {
                                            d: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                p: {
                                                  df: 0,
                                                  docs: {},
                                                  t: { df: 1, docs: { 10: { tf: 1.0 } } },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                        df: 0,
                                        docs: {},
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 3,
                  docs: {
                    10: { tf: 1.4142135623730951 },
                    13: { tf: 1.0 },
                    9: { tf: 1.7320508075688772 },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            l: {
              df: 0,
              docs: {},
              i: {
                c: { df: 0, docs: {}, k: { df: 1, docs: { 9: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 3,
                      docs: {
                        13: { tf: 1.4142135623730951 },
                        6: { tf: 2.23606797749979 },
                        9: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    n: { d: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 13: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 4,
                    docs: {
                      5: { tf: 1.4142135623730951 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                      9: { tf: 1.0 },
                    },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 10: { tf: 1.0 } } } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 10: { tf: 1.0 } } } },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            u: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 11: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            a: { df: 0, docs: {}, t: { a: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, p: { df: 1, docs: { 0: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: {
              a: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    g: {
                      '.': {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              n: { df: 1, docs: { 10: { tf: 1.4142135623730951 } } },
                            },
                          },
                        },
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                i: {
                                  df: 0,
                                  docs: {},
                                  t: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 5,
                      docs: {
                        10: { tf: 2.0 },
                        11: { tf: 2.0 },
                        12: { tf: 1.0 },
                        8: { tf: 2.0 },
                        9: { tf: 1.7320508075688772 },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 3, docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 }, 5: { tf: 1.0 } } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              c: {
                df: 1,
                docs: { 12: { tf: 1.4142135623730951 } },
                u: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          df: 0,
          docs: {},
          e: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
            },
            c: {
              df: 0,
              docs: {},
              h: { df: 0, docs: {}, o: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 13: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 13: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              r: {
                df: 1,
                docs: { 5: { tf: 1.0 } },
                o: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
            },
            v: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: { df: 2, docs: { 5: { tf: 2.23606797749979 }, 7: { tf: 1.0 } } },
                },
              },
            },
            x: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 8,
                      docs: {
                        10: { tf: 1.0 },
                        11: { tf: 1.0 },
                        2: { tf: 1.0 },
                        3: { tf: 1.0 },
                        4: { tf: 1.0 },
                        5: { tf: 1.4142135623730951 },
                        6: { tf: 1.0 },
                        9: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, i: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 13: { tf: 2.23606797749979 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          f: {
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, r: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } } },
                },
              },
              df: 0,
              docs: {},
              t: {
                c: {
                  df: 0,
                  docs: {},
                  h: {
                    df: 3,
                    docs: { 5: { tf: 1.0 }, 6: { tf: 1.4142135623730951 }, 7: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 13: { tf: 1.0 } },
                },
              },
            },
          },
          g: {
            df: 0,
            docs: {},
            r: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  h: {
                    '(': {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          k: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                r: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      p: {
                                        df: 0,
                                        docs: {},
                                        o: {
                                          df: 0,
                                          docs: {},
                                          n: {
                                            df: 0,
                                            docs: {},
                                            s: {
                                              df: 0,
                                              docs: {},
                                              e: {
                                                '.': {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 0,
                                                    docs: {},
                                                    o: {
                                                      df: 0,
                                                      docs: {},
                                                      k: {
                                                        df: 0,
                                                        docs: {},
                                                        e: {
                                                          df: 0,
                                                          docs: {},
                                                          n: { df: 1, docs: { 5: { tf: 1.0 } } },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    df: 1,
                    docs: { 5: { tf: 1.0 } },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          h: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 2,
                    docs: { 11: { tf: 1.0 }, 7: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 3, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 }, 6: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 2,
                    docs: { 5: { tf: 1.4142135623730951 }, 9: { tf: 1.4142135623730951 } },
                  },
                },
                p: { df: 1, docs: { 7: { tf: 1.0 } } },
              },
            },
          },
          i: {
            '\\': {
              "'": {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, l: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            d: { df: 1, docs: { 9: { tf: 1.0 } } },
            df: 0,
            docs: {},
            m: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
              },
              s: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    n: { c: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    a: {
                      c: {
                        df: 0,
                        docs: {},
                        t: { df: 2, docs: { 13: { tf: 1.0 }, 8: { tf: 1.0 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, k: { df: 1, docs: { 12: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 10: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            i: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      '/': {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              s: {
                                c: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    i: {
                                      b: {
                                        df: 3,
                                        docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 5,
                      docs: {
                        2: { tf: 2.0 },
                        3: { tf: 1.7320508075688772 },
                        4: { tf: 1.0 },
                        5: { tf: 1.7320508075688772 },
                        7: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              g: {
                '.': {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          r: {
                            '(': {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                r: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                },
                df: 1,
                docs: { 5: { tf: 1.0 } },
                i: { c: { df: 1, docs: { 11: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                o: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
                },
              },
            },
          },
          m: {
            df: 0,
            docs: {},
            e: {
              '.': {
                df: 0,
                docs: {},
                n: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 5: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              m: {
                b: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  a: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 7,
                      docs: {
                        0: { tf: 1.0 },
                        13: { tf: 2.449489742783178 },
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 2.6457513110645907 },
                        4: { tf: 1.4142135623730951 },
                        5: { tf: 1.0 },
                        7: { tf: 1.4142135623730951 },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      df: 4,
                      docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 }, 5: { tf: 1.0 }, 7: { tf: 1.0 } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        f: {
                          df: 0,
                          docs: {},
                          t: { df: 2, docs: { 0: { tf: 1.0 }, 13: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            o: {
              d: {
                a: { df: 0, docs: {}, l: { df: 1, docs: { 8: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 5,
                    docs: {
                      10: { tf: 1.0 },
                      11: { tf: 1.0 },
                      12: { tf: 1.4142135623730951 },
                      8: { tf: 1.7320508075688772 },
                      9: { tf: 1.0 },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            s: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                r: {
                  a: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      h: {
                        '.': {
                          a: {
                            df: 0,
                            docs: {},
                            p: {
                              df: 0,
                              docs: {},
                              i: {
                                '(': {
                                  "'": {
                                    '/': {
                                      df: 0,
                                      docs: {},
                                      m: {
                                        df: 0,
                                        docs: {},
                                        e: {
                                          "'": {
                                            ')': {
                                              '.': {
                                                df: 0,
                                                docs: {},
                                                g: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    df: 0,
                                                    docs: {},
                                                    t: { df: 1, docs: { 5: { tf: 1.0 } } },
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                          u: { df: 0, docs: {}, s: { df: 1, docs: { 5: { tf: 1.0 } } } },
                        },
                        df: 1,
                        docs: { 5: { tf: 1.0 } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
          },
          n: {
            a: { df: 0, docs: {}, m: { df: 0, docs: {}, e: { df: 1, docs: { 7: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              v: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } },
              },
            },
          },
          o: {
            a: {
              df: 0,
              docs: {},
              u: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } } },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 3: { tf: 1.0 } } },
            p: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                n: {
                  df: 2,
                  docs: { 10: { tf: 1.4142135623730951 }, 9: { tf: 1.4142135623730951 } },
                },
              },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 2, docs: { 2: { tf: 1.0 }, 5: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
          },
          p: {
            a: { df: 0, docs: {}, s: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            l: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: { df: 0, docs: {}, m: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 5: { tf: 1.0 } } } },
                },
                m: {
                  df: 0,
                  docs: {},
                  p: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
                v: {
                  df: 0,
                  docs: {},
                  i: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
                },
              },
            },
          },
          r: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  x: { df: 0, docs: {}, p: { df: 1, docs: { 3: { tf: 1.0 } } } },
                },
              },
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 2, docs: { 10: { tf: 1.4142135623730951 }, 11: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
              },
              p: {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, i: { df: 1, docs: { 4: { tf: 1.7320508075688772 } } } },
              },
              q: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: { d: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 2, docs: { 13: { tf: 1.0 }, 7: { tf: 1.0 } } } },
                },
              },
              t: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 4,
                      docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 13: { tf: 1.0 }, 7: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 2,
                  docs: { 0: { tf: 1.0 }, 8: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
              df: 0,
              docs: {},
            },
          },
          s: {
            d: { df: 0, docs: {}, k: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } } },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                r: {
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 5,
                  docs: {
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 2.0 },
                    4: { tf: 2.23606797749979 },
                    5: { tf: 1.4142135623730951 },
                    7: { tf: 2.0 },
                  },
                },
                df: 0,
                docs: {},
                t: { df: 2, docs: { 2: { tf: 1.0 }, 4: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 13: { tf: 1.0 } } }, df: 0, docs: {} },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                n: {
                  df: 3,
                  docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 }, 7: { tf: 1.7320508075688772 } },
                  i: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          c: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                n: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 7: { tf: 1.7320508075688772 } },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  t: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
            },
            s: { df: 0, docs: {}, o: { df: 1, docs: { 5: { tf: 1.0 } } } },
            t: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    '.': {
                      a: {
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            h: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 7: { tf: 1.4142135623730951 } },
                  },
                  i: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
                  u: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } },
                },
              },
              df: 0,
              docs: {},
            },
            u: {
              b: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } } },
                },
                s: {
                  c: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: { b: { df: 1, docs: { 5: { tf: 1.0 } } }, df: 0, docs: {} },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
            },
            y: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          t: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                k: {
                  '/': {
                    df: 0,
                    docs: {},
                    f: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        t: {
                          c: {
                            df: 0,
                            docs: {},
                            h: {
                              df: 2,
                              docs: {
                                10: { tf: 1.4142135623730951 },
                                9: { tf: 1.4142135623730951 },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                    s: {
                      df: 0,
                      docs: {},
                      u: {
                        b: {
                          df: 0,
                          docs: {},
                          m: {
                            df: 0,
                            docs: {},
                            i: {
                              df: 0,
                              docs: {},
                              t: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 5,
                  docs: {
                    10: { tf: 1.4142135623730951 },
                    11: { tf: 1.0 },
                    12: { tf: 1.4142135623730951 },
                    8: { tf: 1.7320508075688772 },
                    9: { tf: 1.0 },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                m: {
                  '/': {
                    df: 0,
                    docs: {},
                    m: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            i: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                g: {
                                  '/': {
                                    c: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          df: 0,
                                          docs: {},
                                          v: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              df: 0,
                                              docs: {},
                                              r: {
                                                df: 0,
                                                docs: {},
                                                s: {
                                                  a: {
                                                    df: 0,
                                                    docs: {},
                                                    t: {
                                                      df: 0,
                                                      docs: {},
                                                      i: {
                                                        df: 0,
                                                        docs: {},
                                                        o: {
                                                          df: 0,
                                                          docs: {},
                                                          n: {
                                                            '/': {
                                                              df: 0,
                                                              docs: {},
                                                              e: {
                                                                df: 0,
                                                                docs: {},
                                                                t: {
                                                                  c: {
                                                                    df: 1,
                                                                    docs: { 6: { tf: 1.0 } },
                                                                  },
                                                                  df: 0,
                                                                  docs: {},
                                                                },
                                                              },
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                  df: 0,
                                                  docs: {},
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  df: 4,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    13: { tf: 1.4142135623730951 },
                    8: { tf: 1.0 },
                    9: { tf: 1.4142135623730951 },
                  },
                  s: {
                    '.': {
                      df: 0,
                      docs: {},
                      s: {
                        d: {
                          df: 0,
                          docs: {},
                          k: {
                            '/': {
                              c: {
                                a: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    d: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.0 } } } },
              x: {
                df: 0,
                docs: {},
                t: {
                  df: 5,
                  docs: {
                    2: { tf: 1.0 },
                    3: { tf: 1.7320508075688772 },
                    4: { tf: 1.0 },
                    5: { tf: 1.0 },
                    7: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            h: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: { df: 0, docs: {}, t: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.0 } } } } },
            o: {
              df: 0,
              docs: {},
              k: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 1,
                    docs: { 7: { tf: 1.4142135623730951 } },
                    r: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                df: 0,
                                docs: {},
                                s: { df: 2, docs: { 5: { tf: 1.0 }, 7: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            y: {
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 7,
                  docs: {
                    10: { tf: 1.4142135623730951 },
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                    4: { tf: 1.0 },
                    5: { tf: 1.4142135623730951 },
                    7: { tf: 1.4142135623730951 },
                    9: { tf: 2.0 },
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 10,
              docs: {
                0: { tf: 1.4142135623730951 },
                10: { tf: 1.0 },
                11: { tf: 1.0 },
                2: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
                5: { tf: 1.7320508075688772 },
                6: { tf: 2.23606797749979 },
                7: { tf: 1.4142135623730951 },
                9: { tf: 1.0 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    13: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                    5: { tf: 1.0 },
                    7: { tf: 2.0 },
                  },
                },
              },
            },
          },
          v: {
            a: { df: 0, docs: {}, l: { df: 0, docs: {}, u: { df: 1, docs: { 10: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, n: { df: 2, docs: { 10: { tf: 1.0 }, 9: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            df: 0,
            docs: {},
            e: {
              b: { df: 2, docs: { 13: { tf: 1.0 }, 6: { tf: 1.0 } } },
              df: 0,
              docs: {},
              l: {
                c: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
                df: 0,
                docs: {},
              },
            },
            i: {
              d: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 10: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } }, df: 0, docs: {} },
              },
            },
          },
        },
      },
      title: {
        root: {
          a: {
            c: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  v: { df: 3, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 } } },
                },
              },
            },
            df: 0,
            docs: {},
            p: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          b: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: { c: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            df: 0,
            docs: {},
          },
          c: {
            df: 0,
            docs: {},
            l: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            df: 0,
            docs: {},
            i: {
              a: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    g: {
                      '.': {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            e: { df: 0, docs: {}, n: { df: 1, docs: { 10: { tf: 1.0 } } } },
                          },
                        },
                        s: {
                          df: 0,
                          docs: {},
                          u: {
                            b: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 0,
                                docs: {},
                                i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 1,
                      docs: { 8: { tf: 1.0 } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            o: {
              c: {
                df: 1,
                docs: { 12: { tf: 1.0 } },
                u: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          df: 0,
          docs: {},
          e: {
            df: 0,
            docs: {},
            v: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                n: { df: 0, docs: {}, t: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
            },
            x: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          l: {
            df: 0,
            docs: {},
            i: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 3, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } } },
                  },
                },
              },
            },
          },
          m: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                s: {
                  a: { df: 0, docs: {}, g: { df: 2, docs: { 13: { tf: 1.0 }, 3: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 1, docs: { 8: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
          },
          s: {
            d: { df: 0, docs: {}, k: { df: 1, docs: { 0: { tf: 1.0 } } } },
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, n: { d: { df: 1, docs: { 4: { tf: 1.0 } } }, df: 0, docs: {} } },
          },
          t: {
            a: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                k: {
                  '/': {
                    df: 0,
                    docs: {},
                    f: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        t: {
                          c: { df: 0, docs: {}, h: { df: 1, docs: { 10: { tf: 1.0 } } } },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                    s: {
                      df: 0,
                      docs: {},
                      u: {
                        b: {
                          df: 0,
                          docs: {},
                          m: {
                            df: 0,
                            docs: {},
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 11: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 1,
                  docs: { 8: { tf: 1.0 } },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  s: {
                    '.': {
                      df: 0,
                      docs: {},
                      s: {
                        d: {
                          df: 0,
                          docs: {},
                          k: {
                            '/': {
                              c: {
                                a: {
                                  df: 0,
                                  docs: {},
                                  r: { d: { df: 1, docs: { 9: { tf: 1.0 } } }, df: 0, docs: {} },
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
            },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 1,
              docs: { 6: { tf: 1.0 } },
              e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } },
            },
          },
        },
      },
    },
    lang: 'English',
    pipeline: ['trimmer', 'stopWordFilter', 'stemmer'],
    ref: 'id',
    version: '0.9.5',
  },
  results_options: { limit_results: 30, teaser_word_count: 30 },
  search_options: {
    bool: 'OR',
    expand: true,
    fields: { body: { boost: 1 }, breadcrumbs: { boost: 1 }, title: { boost: 2 } },
  },
});
