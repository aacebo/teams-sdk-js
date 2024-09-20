Object.assign(window.search, {
  doc_urls: [
    '1.welcome.html#-teams-sdk-documentation',
    '2.getting-started.html#getting-started',
    '3.basics/index.html#basics',
    '3.basics/1.on-activity.html#-listening-to-activities',
    '3.basics/2.on-message.html#-listening-to-message-activities',
    '3.basics/3.sending-activities.html#-sending-activities',
    '3.basics/4.on-event.html#-listening-to-events',
    '3.basics/5.api.html#using-the-api-client',
    '3.basics/6.auth.html#--user-authentication',
    '4.dialogs/index.html#--dialogs-task-modules',
    '4.dialogs/1.on-dialog.html#-listening-to-dialogs',
    '4.dialogs/1.on-dialog.html#dialogopen-taskfetch',
    '4.dialogs/2.on-dialog-submit.html#-dialog-submit',
    '4.dialogs/2.on-dialog-submit.html#dialogsubmit-tasksubmit',
    '5.message-extensions/index.html#--message-extensions',
  ],
  index: {
    documentStore: {
      docInfo: {
        0: { body: 25, breadcrumbs: 4, title: 3 },
        1: { body: 36, breadcrumbs: 4, title: 2 },
        10: { body: 10, breadcrumbs: 7, title: 2 },
        11: { body: 32, breadcrumbs: 7, title: 2 },
        12: { body: 10, breadcrumbs: 7, title: 2 },
        13: { body: 21, breadcrumbs: 7, title: 2 },
        14: { body: 37, breadcrumbs: 4, title: 2 },
        2: { body: 0, breadcrumbs: 2, title: 1 },
        3: { body: 27, breadcrumbs: 5, title: 2 },
        4: { body: 29, breadcrumbs: 6, title: 3 },
        5: { body: 23, breadcrumbs: 5, title: 2 },
        6: { body: 51, breadcrumbs: 5, title: 2 },
        7: { body: 26, breadcrumbs: 7, title: 3 },
        8: { body: 52, breadcrumbs: 5, title: 2 },
        9: { body: 3, breadcrumbs: 6, title: 3 },
      },
      docs: {
        0: {
          body: '⚠️ Warning: this project is not supported or affiliated with Microsoft in any way! Microsoft Teams is a feature rich messaging platform. It provides features that developers can use to create immersive app experiences, below are some of the different features that can be used with this SDK.',
          breadcrumbs: 'Welcome » 📖 Teams SDK: Documentation',
          id: '0',
          title: '📖 Teams SDK: Documentation',
        },
        1: {
          body: "First lets initialize an app. $: npm install @teams.sdk/apps @teams.sdk/api @teams.sdk/common import { App } from '@teams.sdk/apps'; const clientId = process.env.CLIENT_ID;\nconst clientSecret = process.env.CLIENT_SECRET; if (!clientId || !clientSecret) { throw new Error('missing environment variables');\n} const app = new App({ type: 'MultiTenant', clientId, clientSecret,\n}); (async () => { await app.start();\n})();",
          breadcrumbs: 'Getting Started » Getting Started',
          id: '1',
          title: 'Getting Started',
        },
        10: {
          body: 'You can listen on the dialog.open activity and respond with adaptive cards or url to be rendered as the dialogs content.',
          breadcrumbs: 'Dialogs (Task Modules) » Listening To Dialogs » 👂 Listening To Dialogs',
          id: '10',
          title: '👂 Listening To Dialogs',
        },
        11: {
          body: "triggered when a dialog is opened, used to render dialog contents. Example: when a dialog is opened, render an Adaptive Card as the body. app.on('dialog.open', ({ }) => { return { status: 200, body: { task: { type: 'continue', value: { width: 'large', card: cardAttachment('adaptive', { type: 'AdaptiveCard', version: '1.6', body: [...] }) } } } };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » Listening To Dialogs » dialog.open (task/fetch)',
          id: '11',
          title: 'dialog.open (task/fetch)',
        },
        12: {
          body: 'You can listen on the dialog.submit activity and respond with adaptive cards or url to be rendered as the dialogs content.',
          breadcrumbs: 'Dialogs (Task Modules) » Dialog Submit » 👂 Dialog Submit',
          id: '12',
          title: '👂 Dialog Submit',
        },
        13: {
          body: "triggered when a dialog is submitted, used to handle logic before closing the dialog. Example: when a dialog is submitted, do some custom logic and do not render anything else. app.on('dialog.submit', ({}) => { // ... some logic return { status: 200 };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » Dialog Submit » dialog.submit (task/submit)',
          id: '13',
          title: 'dialog.submit (task/submit)',
        },
        14: {
          body: 'Message extensions (or Compose Extensions) enable users to engage with your web service through buttons and forms within the Microsoft Teams client. Users can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. The results of these interactions can be returned to the Teams client as a richly formatted card.',
          breadcrumbs: 'Message Extensions » 📖 Message Extensions',
          id: '14',
          title: '📖 Message Extensions',
        },
        2: { body: '', breadcrumbs: 'Basics » Basics', id: '2', title: 'Basics' },
        3: {
          body: "To listen/subscribe to different activity types, you can use the on() method. Handlers will be called in the order they are added. Example: an echo bot that listens for messages sent to it and responds. app.on('message', async ({ activity, send }) => { await send({ type: 'message', text: `you said: \"${activity.text}\"` });\n});",
          breadcrumbs: 'Basics » Listening To Activities » 👂 Listening To Activities',
          id: '3',
          title: '👂 Listening To Activities',
        },
        4: {
          body: "You can listen/subscribe to messages using static text or Regexp. Example: when the user sends a message to the bot with the text /logout we send a message back. app.message('/logout', async ({ activity, send }) => { await send({ type: 'message', text: \"ok, I'll sign you out!\" });\n});",
          breadcrumbs: 'Basics » Listening To Messages » 👂 Listening To Message Activities',
          id: '4',
          title: '👂 Listening To Message Activities',
        },
        5: {
          body: "To send an activity you can either use the send or reply methods. Example: an echo bot that listens for messages sent to it and responds. app.on('message', async ({ activity, reply }) => { await reply({ type: 'message', text: `you said: \"${activity.text}\"` });\n});",
          breadcrumbs: 'Basics » Sending Activities » 💬 Sending Activities',
          id: '5',
          title: '💬 Sending Activities',
        },
        6: {
          body: "To listen/subscribe to different event types, you can use the event() method. Handlers will be called in the order they are added. Example: We subscribe to errors that occur in the app. app.event('error', ({ err, log }) => { log.error(err);\n}); Example: When a user signs in using OAuth or SSO, use the graph api to fetch their profile and say hello. app.event('signin', async ({ activity, tokenResponse, send }) => { const msgraph = graph(tokenResponse.token); const me: MSGraph.User = await msgraph.api('/me').get(); await send({ type: 'message', text: `👋 Hello ${me.name}`, });\n});",
          breadcrumbs: 'Basics » Listening To Events » 👂 Listening To Events',
          id: '6',
          title: '👂 Listening To Events',
        },
        7: {
          body: "an instance of the web api client is passed to handlers that can be used to fetch team/meeting/conversation/etc... details. Example: we use the api client to fetch the conversations array of members. app.on('message', async ({ activity, api }) => { const members = await api.conversations.members(activity.conversation.id).get();\n});",
          breadcrumbs: 'Basics » Using The API Client » Using the API Client',
          id: '7',
          title: 'Using the API Client',
        },
        8: {
          body: "Prompting the user to sign in using an OAuth connection has never been easier! Just use the signin method to send the request and the listen to the signin event to handle the token result. app.on('message', async ({ signin, send }) => { const state = {}; // ... fetch some state if (!state.authenticated) { await send({ type: 'message', text: 'please sign in so I can help you...', }); await signin('connection-name'); return; } await send({ type: 'message', text: 'you are already signed in!', });\n}); app.event('signin', async ({ tokenResponse }) => { // do something with the token...\n});",
          breadcrumbs: 'Basics » User Authentication » 📖 User Authentication',
          id: '8',
          title: '📖 User Authentication',
        },
        9: {
          body: 'Invoking Task Modules',
          breadcrumbs: 'Dialogs (Task Modules) » 📖 Dialogs (Task Modules)',
          id: '9',
          title: '📖 Dialogs (Task Modules)',
        },
      },
      length: 15,
      save: true,
    },
    fields: ['title', 'body', 'breadcrumbs'],
    index: {
      body: {
        root: {
          1: { '.': { 6: { df: 1, docs: { 11: { tf: 1.0 } } }, df: 0, docs: {} }, df: 0, docs: {} },
          2: {
            0: { 0: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  v: {
                    df: 7,
                    docs: {
                      10: { tf: 1.0 },
                      12: { tf: 1.0 },
                      3: { tf: 1.7320508075688772 },
                      4: { tf: 1.4142135623730951 },
                      5: { tf: 1.7320508075688772 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
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
                                  t: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } },
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
                    df: 3,
                    docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 12: { tf: 1.0 } },
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
                              r: { d: { df: 1, docs: { 11: { tf: 1.0 } } }, df: 0, docs: {} },
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
              df: 2,
              docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            f: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
            },
            l: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  a: {
                    d: { df: 0, docs: {}, i: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                t: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
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
                                                                                                                          7: {
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
                docs: { 6: { tf: 1.0 }, 7: { tf: 2.0 } },
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
                                        r: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                                          n: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } },
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
                                                t: { df: 1, docs: { 4: { tf: 1.0 } } },
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
                                              n: { df: 1, docs: { 11: { tf: 1.0 } } },
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
                                                  t: { df: 1, docs: { 13: { tf: 1.0 } } },
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
                                        3: { tf: 1.0 },
                                        5: { tf: 1.0 },
                                        7: { tf: 1.0 },
                                        8: { tf: 1.0 },
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
                  s: {
                    df: 0,
                    docs: {},
                    t: {
                      a: {
                        df: 0,
                        docs: {},
                        r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 3,
                docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 }, 6: { tf: 1.0 } },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: { a: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
              r: {
                a: { df: 0, docs: {}, y: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                    df: 7,
                    docs: {
                      1: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                      8: { tf: 1.4142135623730951 },
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
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                    df: 7,
                    docs: {
                      1: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.4142135623730951 },
                      7: { tf: 1.0 },
                      8: { tf: 1.7320508075688772 },
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
              c: { df: 0, docs: {}, k: { df: 1, docs: { 4: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: { c: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
                o: { df: 0, docs: {}, r: { df: 1, docs: { 13: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, w: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: { df: 0, docs: {}, i: { df: 1, docs: { 11: { tf: 1.7320508075688772 } } } },
              df: 0,
              docs: {},
              t: { df: 3, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 5: { tf: 1.0 } } },
              x: { df: 1, docs: { 14: { tf: 1.0 } } },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 2, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } } } },
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
                                                  t: { df: 1, docs: { 11: { tf: 1.0 } } },
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
                  df: 4,
                  docs: {
                    10: { tf: 1.0 },
                    11: { tf: 1.4142135623730951 },
                    12: { tf: 1.0 },
                    14: { tf: 1.0 },
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
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 2,
                      docs: { 14: { tf: 1.4142135623730951 }, 7: { tf: 1.7320508075688772 } },
                      i: { d: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                      s: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
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
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 13: { tf: 1.0 } } } },
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
                    n: { d: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 14: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                      1: { tf: 1.7320508075688772 },
                      6: { tf: 1.4142135623730951 },
                      7: { tf: 1.0 },
                      8: { tf: 1.0 },
                    },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 3, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 12: { tf: 1.0 } } },
                    },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 11: { tf: 1.0 } } } },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                              n: { df: 2, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 } } },
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
                                  t: { df: 2, docs: { 12: { tf: 1.0 }, 13: { tf: 1.0 } } },
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
                        11: { tf: 1.7320508075688772 },
                        12: { tf: 1.4142135623730951 },
                        13: { tf: 1.7320508075688772 },
                        9: { tf: 1.0 },
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
                    r: { df: 3, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 14: { tf: 1.0 } } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 8: { tf: 1.0 } } } },
                },
              },
            },
            c: {
              df: 0,
              docs: {},
              h: { df: 0, docs: {}, o: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 14: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 14: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              r: {
                df: 1,
                docs: { 6: { tf: 1.0 } },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    '(': {
                      "'": {
                        df: 0,
                        docs: {},
                        m: {
                          df: 0,
                          docs: {},
                          i: {
                            df: 0,
                            docs: {},
                            s: { df: 0, docs: {}, s: { df: 1, docs: { 1: { tf: 1.0 } } } },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 6: { tf: 1.0 } },
                  },
                },
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
                  t: { df: 2, docs: { 6: { tf: 1.7320508075688772 }, 8: { tf: 1.0 } } },
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
                      df: 7,
                      docs: {
                        11: { tf: 1.0 },
                        13: { tf: 1.0 },
                        3: { tf: 1.0 },
                        4: { tf: 1.0 },
                        5: { tf: 1.0 },
                        6: { tf: 1.4142135623730951 },
                        7: { tf: 1.0 },
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
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 14: { tf: 1.7320508075688772 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                    docs: { 6: { tf: 1.0 }, 7: { tf: 1.4142135623730951 }, 8: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 14: { tf: 1.0 } },
                },
              },
            },
          },
          g: {
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                                                          n: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                    docs: { 6: { tf: 1.0 } },
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
                    docs: { 13: { tf: 1.0 }, 8: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 3, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 }, 7: { tf: 1.0 } } },
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
                l: { df: 0, docs: {}, o: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                p: { df: 1, docs: { 8: { tf: 1.0 } } },
              },
            },
          },
          i: {
            "'": {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 1, docs: { 4: { tf: 1.0 } } } },
            },
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
              p: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, i: { df: 2, docs: { 1: { tf: 1.0 }, 14: { tf: 1.0 } } } },
              },
              s: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 1: { tf: 1.0 } } },
                    n: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
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
                      c: { df: 0, docs: {}, t: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                o: { df: 0, docs: {}, k: { df: 1, docs: { 9: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 11: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                                        docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 6: { tf: 1.0 } },
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
                      df: 7,
                      docs: {
                        10: { tf: 1.4142135623730951 },
                        12: { tf: 1.0 },
                        3: { tf: 1.4142135623730951 },
                        4: { tf: 1.0 },
                        5: { tf: 1.0 },
                        6: { tf: 1.0 },
                        8: { tf: 1.0 },
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
                                r: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                docs: { 6: { tf: 1.0 } },
                i: { c: { df: 1, docs: { 13: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                o: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.4142135623730951 } } } },
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
                        14: { tf: 2.0 },
                        3: { tf: 1.4142135623730951 },
                        4: { tf: 2.23606797749979 },
                        5: { tf: 1.4142135623730951 },
                        6: { tf: 1.0 },
                        8: { tf: 1.4142135623730951 },
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
                      docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 }, 6: { tf: 1.0 }, 8: { tf: 1.0 } },
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
                          t: { df: 2, docs: { 0: { tf: 1.4142135623730951 }, 14: { tf: 1.0 } } },
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
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.4142135623730951 } } } },
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
                                                    t: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                          u: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } },
                        },
                        df: 1,
                        docs: { 6: { tf: 1.0 } },
                      },
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
              l: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      e: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
                    },
                  },
                },
              },
            },
          },
          n: {
            a: { df: 0, docs: {}, m: { df: 0, docs: {}, e: { df: 1, docs: { 8: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              v: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 8: { tf: 1.0 } } } },
              },
              w: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
            },
            p: { df: 0, docs: {}, m: { df: 1, docs: { 1: { tf: 1.0 } } } },
          },
          o: {
            a: {
              df: 0,
              docs: {},
              u: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } } },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 4: { tf: 1.0 } } },
            p: {
              df: 0,
              docs: {},
              e: { df: 0, docs: {}, n: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } } },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 2, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
          },
          p: {
            a: { df: 0, docs: {}, s: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } } },
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
                a: { df: 0, docs: {}, s: { df: 1, docs: { 8: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              o: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: {
                        '.': {
                          df: 0,
                          docs: {},
                          e: {
                            df: 0,
                            docs: {},
                            n: {
                              df: 0,
                              docs: {},
                              v: {
                                '.': {
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
                                          n: {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              _: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  d: { df: 1, docs: { 1: { tf: 1.0 } } },
                                                  df: 0,
                                                  docs: {},
                                                },
                                                s: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    c: {
                                                      df: 0,
                                                      docs: {},
                                                      r: {
                                                        df: 0,
                                                        docs: {},
                                                        e: {
                                                          df: 0,
                                                          docs: {},
                                                          t: { df: 1, docs: { 1: { tf: 1.0 } } },
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
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
                j: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                },
                m: {
                  df: 0,
                  docs: {},
                  p: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                  x: { df: 0, docs: {}, p: { df: 1, docs: { 4: { tf: 1.0 } } } },
                },
              },
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 4,
                      docs: {
                        10: { tf: 1.0 },
                        11: { tf: 1.4142135623730951 },
                        12: { tf: 1.0 },
                        13: { tf: 1.0 },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              p: {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, i: { df: 1, docs: { 5: { tf: 1.7320508075688772 } } } },
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
                    s: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                    n: {
                      d: {
                        df: 4,
                        docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 2, docs: { 14: { tf: 1.0 }, 8: { tf: 1.0 } } } },
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
                      docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 }, 14: { tf: 1.0 }, 8: { tf: 1.0 } },
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
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                    3: { tf: 1.4142135623730951 },
                    4: { tf: 2.0 },
                    5: { tf: 1.7320508075688772 },
                    6: { tf: 1.4142135623730951 },
                    8: { tf: 2.0 },
                  },
                },
                df: 0,
                docs: {},
                t: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  docs: { 4: { tf: 1.0 }, 6: { tf: 1.0 }, 8: { tf: 1.7320508075688772 } },
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
                                    c: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                      docs: { 8: { tf: 1.7320508075688772 } },
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
                  t: { df: 0, docs: {}, h: { df: 1, docs: { 8: { tf: 1.0 } } } },
                },
              },
            },
            s: { df: 0, docs: {}, o: { df: 1, docs: { 6: { tf: 1.0 } } } },
            t: {
              a: {
                df: 0,
                docs: {},
                r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                                n: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 8: { tf: 1.4142135623730951 } },
                  },
                  i: { c: { df: 1, docs: { 4: { tf: 1.0 } } }, df: 0, docs: {} },
                  u: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } },
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
                  i: {
                    df: 0,
                    docs: {},
                    t: { df: 2, docs: { 12: { tf: 1.0 }, 13: { tf: 1.4142135623730951 } } },
                  },
                },
                s: {
                  c: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: { b: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                  },
                },
              },
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
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                          c: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
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
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 13: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 2,
                  docs: { 11: { tf: 1.0 }, 9: { tf: 1.4142135623730951 } },
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
                                                                    docs: { 7: { tf: 1.0 } },
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
                  df: 2,
                  docs: { 0: { tf: 1.4142135623730951 }, 14: { tf: 1.4142135623730951 } },
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
                              a: {
                                df: 0,
                                docs: {},
                                p: {
                                  df: 0,
                                  docs: {},
                                  i: { df: 1, docs: { 1: { tf: 1.0 } } },
                                  p: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                                },
                              },
                              c: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  m: {
                                    df: 0,
                                    docs: {},
                                    m: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
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
              x: {
                df: 0,
                docs: {},
                t: {
                  df: 5,
                  docs: {
                    3: { tf: 1.0 },
                    4: { tf: 1.7320508075688772 },
                    5: { tf: 1.0 },
                    6: { tf: 1.0 },
                    8: { tf: 1.4142135623730951 },
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
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  },
                  w: { df: 1, docs: { 1: { tf: 1.0 } } },
                },
              },
            },
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
                    docs: { 8: { tf: 1.4142135623730951 } },
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
                                s: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } },
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
                      r: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } },
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
                    1: { tf: 1.0 },
                    11: { tf: 1.4142135623730951 },
                    3: { tf: 1.4142135623730951 },
                    4: { tf: 1.0 },
                    5: { tf: 1.0 },
                    6: { tf: 1.4142135623730951 },
                    8: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            r: { df: 0, docs: {}, l: { df: 2, docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 } } } },
            s: {
              df: 9,
              docs: {
                0: { tf: 1.4142135623730951 },
                11: { tf: 1.0 },
                13: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
                5: { tf: 1.0 },
                6: { tf: 1.7320508075688772 },
                7: { tf: 1.7320508075688772 },
                8: { tf: 1.4142135623730951 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    14: { tf: 1.4142135623730951 },
                    4: { tf: 1.0 },
                    6: { tf: 1.0 },
                    8: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
          },
          v: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, u: { df: 1, docs: { 11: { tf: 1.0 } } } },
              r: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    b: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                    o: { df: 0, docs: {}, n: { df: 1, docs: { 11: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            a: {
              df: 0,
              docs: {},
              r: { df: 0, docs: {}, n: { df: 1, docs: { 0: { tf: 1.0 } } } },
              y: { df: 1, docs: { 0: { tf: 1.0 } } },
            },
            df: 0,
            docs: {},
            e: { b: { df: 2, docs: { 14: { tf: 1.0 }, 7: { tf: 1.0 } } }, df: 0, docs: {} },
            i: {
              d: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                },
              },
            },
          },
        },
      },
      breadcrumbs: {
        root: {
          1: { '.': { 6: { df: 1, docs: { 11: { tf: 1.0 } } }, df: 0, docs: {} }, df: 0, docs: {} },
          2: {
            0: { 0: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  v: {
                    df: 7,
                    docs: {
                      10: { tf: 1.0 },
                      12: { tf: 1.0 },
                      3: { tf: 2.23606797749979 },
                      4: { tf: 1.7320508075688772 },
                      5: { tf: 2.23606797749979 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
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
                                  t: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } },
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
                    df: 3,
                    docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 12: { tf: 1.0 } },
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
                              r: { d: { df: 1, docs: { 11: { tf: 1.0 } } }, df: 0, docs: {} },
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
              df: 2,
              docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            f: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 0: { tf: 1.0 } } } },
                },
              },
            },
            l: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  a: {
                    d: { df: 0, docs: {}, i: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                t: { df: 0, docs: {}, h: { df: 1, docs: { 13: { tf: 1.0 } } } },
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
                                                                                                                          7: {
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
                docs: { 6: { tf: 1.0 }, 7: { tf: 2.449489742783178 } },
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
                                        r: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                                          n: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } },
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
                                                t: { df: 1, docs: { 4: { tf: 1.0 } } },
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
                                              n: { df: 1, docs: { 11: { tf: 1.0 } } },
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
                                                  t: { df: 1, docs: { 13: { tf: 1.0 } } },
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
                                        3: { tf: 1.0 },
                                        5: { tf: 1.0 },
                                        7: { tf: 1.0 },
                                        8: { tf: 1.0 },
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
                  s: {
                    df: 0,
                    docs: {},
                    t: {
                      a: {
                        df: 0,
                        docs: {},
                        r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 3,
                docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 }, 6: { tf: 1.0 } },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: { a: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
              r: {
                a: { df: 0, docs: {}, y: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                    df: 7,
                    docs: {
                      1: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                      8: { tf: 1.4142135623730951 },
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
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.7320508075688772 } } } },
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
                    df: 7,
                    docs: {
                      1: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.4142135623730951 },
                      7: { tf: 1.0 },
                      8: { tf: 1.7320508075688772 },
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
              c: { df: 0, docs: {}, k: { df: 1, docs: { 4: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                i: {
                  c: {
                    df: 7,
                    docs: {
                      2: { tf: 1.7320508075688772 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.0 },
                      6: { tf: 1.0 },
                      7: { tf: 1.0 },
                      8: { tf: 1.0 },
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
                o: { df: 0, docs: {}, r: { df: 1, docs: { 13: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, w: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: { df: 0, docs: {}, i: { df: 1, docs: { 11: { tf: 1.7320508075688772 } } } },
              df: 0,
              docs: {},
              t: { df: 3, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 5: { tf: 1.0 } } },
              x: { df: 1, docs: { 14: { tf: 1.0 } } },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 2, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } } } },
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
                                                  t: { df: 1, docs: { 11: { tf: 1.0 } } },
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
                  df: 4,
                  docs: {
                    10: { tf: 1.0 },
                    11: { tf: 1.4142135623730951 },
                    12: { tf: 1.0 },
                    14: { tf: 1.0 },
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
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 2,
                      docs: { 14: { tf: 1.4142135623730951 }, 7: { tf: 2.23606797749979 } },
                      i: { d: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                      s: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
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
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 13: { tf: 1.0 } } } },
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
                    n: { d: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 14: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                      1: { tf: 1.7320508075688772 },
                      6: { tf: 1.4142135623730951 },
                      7: { tf: 1.0 },
                      8: { tf: 1.0 },
                    },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 3, docs: { 10: { tf: 1.0 }, 11: { tf: 1.0 }, 12: { tf: 1.0 } } },
                    },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 11: { tf: 1.0 } } } },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 13: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                              n: {
                                df: 2,
                                docs: { 10: { tf: 1.0 }, 11: { tf: 1.4142135623730951 } },
                              },
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
                                  t: {
                                    df: 2,
                                    docs: { 12: { tf: 1.0 }, 13: { tf: 1.4142135623730951 } },
                                  },
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
                        10: { tf: 2.23606797749979 },
                        11: { tf: 2.23606797749979 },
                        12: { tf: 2.23606797749979 },
                        13: { tf: 2.23606797749979 },
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
                    r: { df: 3, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 14: { tf: 1.0 } } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 8: { tf: 1.0 } } } },
                },
              },
            },
            c: {
              df: 0,
              docs: {},
              h: { df: 0, docs: {}, o: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 14: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 14: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    o: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              r: {
                df: 1,
                docs: { 6: { tf: 1.0 } },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    '(': {
                      "'": {
                        df: 0,
                        docs: {},
                        m: {
                          df: 0,
                          docs: {},
                          i: {
                            df: 0,
                            docs: {},
                            s: { df: 0, docs: {}, s: { df: 1, docs: { 1: { tf: 1.0 } } } },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 6: { tf: 1.0 } },
                  },
                },
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
                  t: { df: 2, docs: { 6: { tf: 2.23606797749979 }, 8: { tf: 1.0 } } },
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
                      df: 7,
                      docs: {
                        11: { tf: 1.0 },
                        13: { tf: 1.0 },
                        3: { tf: 1.0 },
                        4: { tf: 1.0 },
                        5: { tf: 1.0 },
                        6: { tf: 1.4142135623730951 },
                        7: { tf: 1.0 },
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
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 14: { tf: 2.23606797749979 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                    docs: { 6: { tf: 1.0 }, 7: { tf: 1.4142135623730951 }, 8: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 14: { tf: 1.0 } },
                },
              },
            },
          },
          g: {
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } } },
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
                                                          n: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                    docs: { 6: { tf: 1.0 } },
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
                    docs: { 13: { tf: 1.0 }, 8: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 3, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 }, 7: { tf: 1.0 } } },
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
                l: { df: 0, docs: {}, o: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                p: { df: 1, docs: { 8: { tf: 1.0 } } },
              },
            },
          },
          i: {
            "'": {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, l: { df: 1, docs: { 4: { tf: 1.0 } } } },
            },
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
              p: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
                },
              },
            },
            n: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, i: { df: 2, docs: { 1: { tf: 1.0 }, 14: { tf: 1.0 } } } },
              },
              s: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 1: { tf: 1.0 } } },
                    n: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
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
                      c: { df: 0, docs: {}, t: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                o: { df: 0, docs: {}, k: { df: 1, docs: { 9: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 11: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                                        docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 6: { tf: 1.0 } },
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
                      df: 8,
                      docs: {
                        10: { tf: 2.0 },
                        11: { tf: 1.0 },
                        12: { tf: 1.0 },
                        3: { tf: 2.0 },
                        4: { tf: 1.7320508075688772 },
                        5: { tf: 1.0 },
                        6: { tf: 1.7320508075688772 },
                        8: { tf: 1.0 },
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
                                r: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                docs: { 6: { tf: 1.0 } },
                i: { c: { df: 1, docs: { 13: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
                o: {
                  df: 0,
                  docs: {},
                  u: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.4142135623730951 } } } },
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
                        14: { tf: 2.449489742783178 },
                        3: { tf: 1.4142135623730951 },
                        4: { tf: 2.6457513110645907 },
                        5: { tf: 1.4142135623730951 },
                        6: { tf: 1.0 },
                        8: { tf: 1.4142135623730951 },
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
                      docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 }, 6: { tf: 1.0 }, 8: { tf: 1.0 } },
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
                          t: { df: 2, docs: { 0: { tf: 1.4142135623730951 }, 14: { tf: 1.0 } } },
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
                      12: { tf: 1.0 },
                      13: { tf: 1.0 },
                      9: { tf: 2.0 },
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
                                                    t: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                          u: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } },
                        },
                        df: 1,
                        docs: { 6: { tf: 1.0 } },
                      },
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
              l: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      e: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
                    },
                  },
                },
              },
            },
          },
          n: {
            a: { df: 0, docs: {}, m: { df: 0, docs: {}, e: { df: 1, docs: { 8: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              v: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 8: { tf: 1.0 } } } },
              },
              w: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
            },
            p: { df: 0, docs: {}, m: { df: 1, docs: { 1: { tf: 1.0 } } } },
          },
          o: {
            a: {
              df: 0,
              docs: {},
              u: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } } },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 6: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 4: { tf: 1.0 } } },
            p: {
              df: 0,
              docs: {},
              e: { df: 0, docs: {}, n: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } } },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 2, docs: { 3: { tf: 1.0 }, 6: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
          },
          p: {
            a: { df: 0, docs: {}, s: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } } },
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
                a: { df: 0, docs: {}, s: { df: 1, docs: { 8: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              o: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: {
                        '.': {
                          df: 0,
                          docs: {},
                          e: {
                            df: 0,
                            docs: {},
                            n: {
                              df: 0,
                              docs: {},
                              v: {
                                '.': {
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
                                          n: {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              _: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  d: { df: 1, docs: { 1: { tf: 1.0 } } },
                                                  df: 0,
                                                  docs: {},
                                                },
                                                s: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    c: {
                                                      df: 0,
                                                      docs: {},
                                                      r: {
                                                        df: 0,
                                                        docs: {},
                                                        e: {
                                                          df: 0,
                                                          docs: {},
                                                          t: { df: 1, docs: { 1: { tf: 1.0 } } },
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
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
                j: {
                  df: 0,
                  docs: {},
                  e: {
                    c: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                    df: 0,
                    docs: {},
                  },
                },
                m: {
                  df: 0,
                  docs: {},
                  p: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                  x: { df: 0, docs: {}, p: { df: 1, docs: { 4: { tf: 1.0 } } } },
                },
              },
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 4,
                      docs: {
                        10: { tf: 1.0 },
                        11: { tf: 1.4142135623730951 },
                        12: { tf: 1.0 },
                        13: { tf: 1.0 },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              p: {
                df: 0,
                docs: {},
                l: { df: 0, docs: {}, i: { df: 1, docs: { 5: { tf: 1.7320508075688772 } } } },
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
                    s: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                    n: {
                      d: {
                        df: 4,
                        docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 2, docs: { 14: { tf: 1.0 }, 8: { tf: 1.0 } } } },
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
                      docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 }, 14: { tf: 1.0 }, 8: { tf: 1.0 } },
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
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                    3: { tf: 1.4142135623730951 },
                    4: { tf: 2.0 },
                    5: { tf: 2.23606797749979 },
                    6: { tf: 1.4142135623730951 },
                    8: { tf: 2.0 },
                  },
                },
                df: 0,
                docs: {},
                t: { df: 2, docs: { 3: { tf: 1.0 }, 5: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 14: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  docs: { 4: { tf: 1.0 }, 6: { tf: 1.0 }, 8: { tf: 1.7320508075688772 } },
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
                                    c: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                      docs: { 8: { tf: 1.7320508075688772 } },
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
                  t: { df: 0, docs: {}, h: { df: 1, docs: { 8: { tf: 1.0 } } } },
                },
              },
            },
            s: { df: 0, docs: {}, o: { df: 1, docs: { 6: { tf: 1.0 } } } },
            t: {
              a: {
                df: 0,
                docs: {},
                r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } } },
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
                                n: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 1,
                    docs: { 8: { tf: 1.4142135623730951 } },
                  },
                  i: { c: { df: 1, docs: { 4: { tf: 1.0 } } }, df: 0, docs: {} },
                  u: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } },
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
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 2,
                      docs: { 12: { tf: 1.7320508075688772 }, 13: { tf: 1.7320508075688772 } },
                    },
                  },
                },
                s: {
                  c: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: { b: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                  },
                },
              },
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
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 14: { tf: 1.0 } } } },
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
                            h: { df: 1, docs: { 11: { tf: 1.4142135623730951 } } },
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
                              t: { df: 1, docs: { 13: { tf: 1.4142135623730951 } } },
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
                    10: { tf: 1.0 },
                    11: { tf: 1.4142135623730951 },
                    12: { tf: 1.0 },
                    13: { tf: 1.0 },
                    9: { tf: 2.0 },
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
                                                                    docs: { 7: { tf: 1.0 } },
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
                  df: 2,
                  docs: { 0: { tf: 1.7320508075688772 }, 14: { tf: 1.4142135623730951 } },
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
                              a: {
                                df: 0,
                                docs: {},
                                p: {
                                  df: 0,
                                  docs: {},
                                  i: { df: 1, docs: { 1: { tf: 1.0 } } },
                                  p: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                                },
                              },
                              c: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  m: {
                                    df: 0,
                                    docs: {},
                                    m: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
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
              x: {
                df: 0,
                docs: {},
                t: {
                  df: 5,
                  docs: {
                    3: { tf: 1.0 },
                    4: { tf: 1.7320508075688772 },
                    5: { tf: 1.0 },
                    6: { tf: 1.0 },
                    8: { tf: 1.4142135623730951 },
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
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 14: { tf: 1.0 } } } },
                  },
                  w: { df: 1, docs: { 1: { tf: 1.0 } } },
                },
              },
            },
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
                    docs: { 8: { tf: 1.4142135623730951 } },
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
                                s: { df: 2, docs: { 6: { tf: 1.0 }, 8: { tf: 1.0 } } },
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
                      r: { df: 2, docs: { 11: { tf: 1.0 }, 13: { tf: 1.0 } } },
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
                    1: { tf: 1.0 },
                    11: { tf: 1.4142135623730951 },
                    3: { tf: 1.4142135623730951 },
                    4: { tf: 1.0 },
                    5: { tf: 1.0 },
                    6: { tf: 1.4142135623730951 },
                    8: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            r: { df: 0, docs: {}, l: { df: 2, docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 } } } },
            s: {
              df: 9,
              docs: {
                0: { tf: 1.4142135623730951 },
                11: { tf: 1.0 },
                13: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
                5: { tf: 1.0 },
                6: { tf: 1.7320508075688772 },
                7: { tf: 2.23606797749979 },
                8: { tf: 1.4142135623730951 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    14: { tf: 1.4142135623730951 },
                    4: { tf: 1.0 },
                    6: { tf: 1.0 },
                    8: { tf: 2.0 },
                  },
                },
              },
            },
          },
          v: {
            a: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, u: { df: 1, docs: { 11: { tf: 1.0 } } } },
              r: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    b: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                    o: { df: 0, docs: {}, n: { df: 1, docs: { 11: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            a: {
              df: 0,
              docs: {},
              r: { df: 0, docs: {}, n: { df: 1, docs: { 0: { tf: 1.0 } } } },
              y: { df: 1, docs: { 0: { tf: 1.0 } } },
            },
            df: 0,
            docs: {},
            e: {
              b: { df: 2, docs: { 14: { tf: 1.0 }, 7: { tf: 1.0 } } },
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
                t: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 14: { tf: 1.0 } } } },
                },
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
                  v: { df: 3, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 5: { tf: 1.0 } } },
                },
              },
            },
            df: 0,
            docs: {},
            p: { df: 0, docs: {}, i: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 8: { tf: 1.0 } } } },
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
                i: { c: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  n: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                            e: { df: 0, docs: {}, n: { df: 1, docs: { 11: { tf: 1.0 } } } },
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
                                i: { df: 0, docs: {}, t: { df: 1, docs: { 13: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 3,
                      docs: { 10: { tf: 1.0 }, 12: { tf: 1.0 }, 9: { tf: 1.0 } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            o: {
              c: {
                df: 0,
                docs: {},
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
                n: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 14: { tf: 1.0 } } } },
                },
              },
            },
          },
          g: { df: 0, docs: {}, e: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } } },
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
                    n: {
                      df: 4,
                      docs: { 10: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 }, 6: { tf: 1.0 } },
                    },
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
                  a: { df: 0, docs: {}, g: { df: 2, docs: { 14: { tf: 1.0 }, 4: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 1, docs: { 9: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
          },
          s: {
            d: { df: 0, docs: {}, k: { df: 1, docs: { 0: { tf: 1.0 } } } },
            df: 0,
            docs: {},
            e: { df: 0, docs: {}, n: { d: { df: 1, docs: { 5: { tf: 1.0 } } }, df: 0, docs: {} } },
            t: {
              a: {
                df: 0,
                docs: {},
                r: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
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
                  i: { df: 0, docs: {}, t: { df: 1, docs: { 12: { tf: 1.0 } } } },
                },
              },
              df: 0,
              docs: {},
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
                          c: { df: 0, docs: {}, h: { df: 1, docs: { 11: { tf: 1.0 } } } },
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
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 13: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 1,
                  docs: { 9: { tf: 1.0 } },
                },
              },
            },
            df: 0,
            docs: {},
            e: { a: { df: 0, docs: {}, m: { df: 1, docs: { 0: { tf: 1.0 } } } }, df: 0, docs: {} },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 1,
              docs: { 7: { tf: 1.0 } },
              e: { df: 0, docs: {}, r: { df: 1, docs: { 8: { tf: 1.0 } } } },
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