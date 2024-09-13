Object.assign(window.search, {
  doc_urls: [
    'welcome.html#-teams-sdk-documentation',
    'dialogs.html#--dialogs-task-modules',
    'dialogs.html#teamssdkcards',
    'dialogs.html#dialogopen-taskfetch',
    'dialogs.html#dialogsubmit-tasksubmit',
    'dialogs.html#docs',
    'message-extensions.html#--message-extensions',
    'user-auth.html#--user-auth',
  ],
  index: {
    documentStore: {
      docInfo: {
        0: { body: 19, breadcrumbs: 4, title: 3 },
        1: { body: 5, breadcrumbs: 6, title: 3 },
        2: { body: 40, breadcrumbs: 4, title: 1 },
        3: { body: 32, breadcrumbs: 5, title: 2 },
        4: { body: 21, breadcrumbs: 5, title: 2 },
        5: { body: 3, breadcrumbs: 4, title: 1 },
        6: { body: 37, breadcrumbs: 4, title: 2 },
        7: { body: 22, breadcrumbs: 4, title: 2 },
      },
      docs: {
        0: {
          body: 'Microsoft Teams is a feature rich messaging platform. It provides features that developers can use to create immersive app experiences, below are some of the different features that can be used with this SDK.',
          breadcrumbs: 'Welcome » 📖 Teams SDK: Documentation',
          id: '0',
          title: '📖 Teams SDK: Documentation',
        },
        1: {
          body: 'Modal dialogs in Teams for rich interaction.',
          breadcrumbs: 'Dialogs (Task Modules) » 📖 Dialogs (Task Modules)',
          id: '1',
          title: '📖 Dialogs (Task Modules)',
        },
        2: {
          body: "dialogs can be opened from teams by using an Adaptive Card Action.Submit . Example: by adding msteams: { type: 'task/fetch' } to the action.data we tell the teams client to open a dialog on click. const card: Card = { type: 'AdaptiveCard', version: '1.6', body: [...], actions: [ { id: 'hello-world', type: 'Action.Submit', title: 'Hello World', data: { msteams: { type: 'task/fetch' } } } ]\n};",
          breadcrumbs: 'Dialogs (Task Modules) » @teams.sdk/cards',
          id: '2',
          title: '@teams.sdk/cards',
        },
        3: {
          body: "triggered when a dialog is opened, used to render dialog contents. Example: when a dialog is opened, render an Adaptive Card as the body. app.on('dialog.open', ({ }) => { return { status: 200, body: { task: { type: 'continue', value: { width: 'large', card: cardAttachment('adaptive', { type: 'AdaptiveCard', version: '1.6', body: [...] }) } } } };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » dialog.open (task/fetch)',
          id: '3',
          title: 'dialog.open (task/fetch)',
        },
        4: {
          body: "triggered when a dialog is submitted, used to handle logic before closing the dialog. Example: when a dialog is submitted, do some custom logic and do not render anything else. app.on('dialog.submit', ({}) => { // ... some logic return { status: 200 };\n});",
          breadcrumbs: 'Dialogs (Task Modules) » dialog.submit (task/submit)',
          id: '4',
          title: 'dialog.submit (task/submit)',
        },
        5: {
          body: 'Invoking Task Modules',
          breadcrumbs: 'Dialogs (Task Modules) » Docs',
          id: '5',
          title: 'Docs',
        },
        6: {
          body: 'Message extensions (or Compose Extensions) enable users to engage with your web service through buttons and forms within the Microsoft Teams client. Users can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. The results of these interactions can be returned to the Teams client as a richly formatted card.',
          breadcrumbs: 'Message Extensions » 📖 Message Extensions',
          id: '6',
          title: '📖 Message Extensions',
        },
        7: {
          body: "You can create bots in Microsoft Teams that access resources on behalf of the user, such as the graph api. Example: when an activity is received, prompt the user to sign in. app.on('activity', async ({ signin }) => { await signin('connectionName');\n});",
          breadcrumbs: 'User Auth » 📖 User Auth',
          id: '7',
          title: '📖 User Auth',
        },
      },
      length: 8,
      save: true,
    },
    fields: ['title', 'body', 'breadcrumbs'],
    index: {
      body: {
        root: {
          1: {
            '.': { 6: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          2: {
            0: { 0: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          a: {
            c: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
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
                            t: { a: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
                                  t: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 2,
                      docs: { 2: { tf: 1.0 }, 6: { tf: 1.0 } },
                    },
                  },
                  v: { df: 1, docs: { 7: { tf: 1.0 } } },
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
                    docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
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
                                d: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
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
              df: 1,
              docs: { 2: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            n: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 4: { tf: 1.0 } } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: { df: 1, docs: { 7: { tf: 1.0 } } },
              p: {
                '.': {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          a: {
                            c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                            df: 0,
                            docs: {},
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
                                            e: {
                                              df: 0,
                                              docs: {},
                                              n: { df: 1, docs: { 3: { tf: 1.0 } } },
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
                                                  t: { df: 1, docs: { 4: { tf: 1.0 } } },
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
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 1,
                docs: { 0: { tf: 1.0 } },
              },
            },
            r: { df: 0, docs: {}, e: { a: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} } },
            s: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                n: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            u: { df: 0, docs: {}, t: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } } },
            w: {
              a: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
          },
          b: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, r: { df: 1, docs: { 4: { tf: 1.0 } } } },
              },
              h: {
                a: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, f: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
                df: 0,
                docs: {},
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
                i: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.7320508075688772 } } },
              },
              df: 0,
              docs: {},
              t: { df: 1, docs: { 7: { tf: 1.0 } } },
              x: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
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
                                                  t: { df: 1, docs: { 3: { tf: 1.0 } } },
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
                    2: { tf: 1.7320508075688772 },
                    3: { tf: 1.4142135623730951 },
                    6: { tf: 1.0 },
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
                c: { df: 0, docs: {}, k: { df: 1, docs: { 2: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: { df: 2, docs: { 2: { tf: 1.0 }, 6: { tf: 1.4142135623730951 } } },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                    n: { d: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 2: { tf: 1.0 } } } },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 3: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, t: { df: 2, docs: { 0: { tf: 1.0 }, 7: { tf: 1.0 } } } },
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
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 4: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            a: { df: 0, docs: {}, t: { a: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} } },
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
                            e: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
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
                                i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 4,
                      docs: {
                        1: { tf: 1.4142135623730951 },
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 1.7320508075688772 },
                        4: { tf: 1.7320508075688772 },
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 0: { tf: 1.0 } } } },
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
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                docs: { 5: { tf: 1.0 } },
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
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
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
                      df: 4,
                      docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 }, 7: { tf: 1.0 } },
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
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.7320508075688772 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 6: { tf: 1.0 } },
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
                p: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                d: { df: 0, docs: {}, l: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                l: { df: 0, docs: {}, o: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } } },
              },
            },
          },
          i: {
            d: { df: 1, docs: { 2: { tf: 1.0 } } },
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
                t: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                        t: { df: 2, docs: { 1: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                o: { df: 0, docs: {}, k: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 3: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            o: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                i: { c: { df: 1, docs: { 4: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
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
                  a: { df: 0, docs: {}, g: { df: 2, docs: { 0: { tf: 1.0 }, 6: { tf: 2.0 } } } },
                  df: 0,
                  docs: {},
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
                          t: { df: 3, docs: { 0: { tf: 1.0 }, 6: { tf: 1.0 }, 7: { tf: 1.0 } } },
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
                a: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 2, docs: { 1: { tf: 1.0 }, 5: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            s: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                e: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
          },
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
                  docs: { 2: { tf: 1.4142135623730951 }, 3: { tf: 1.4142135623730951 } },
                },
              },
            },
          },
          p: {
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
            },
            r: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
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
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, v: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 2, docs: { 3: { tf: 1.4142135623730951 }, 4: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    r: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                    n: { df: 3, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                  docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  df: 1,
                  docs: { 7: { tf: 1.0 } },
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
                                              df: 0,
                                              docs: {},
                                              n: {
                                                a: {
                                                  df: 0,
                                                  docs: {},
                                                  m: { df: 1, docs: { 7: { tf: 1.0 } } },
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
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 7: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            t: {
              a: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, u: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } } },
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
                  i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.4142135623730951 } } } },
                },
              },
              c: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                            h: { df: 2, docs: { 2: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } } },
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
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 3,
                  docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 }, 5: { tf: 1.0 } },
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
                  df: 5,
                  docs: {
                    0: { tf: 1.4142135623730951 },
                    1: { tf: 1.0 },
                    2: { tf: 1.4142135623730951 },
                    6: { tf: 1.4142135623730951 },
                    7: { tf: 1.0 },
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
                                  r: { d: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
              l: { df: 0, docs: {}, l: { df: 1, docs: { 2: { tf: 1.0 } } } },
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
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: { df: 0, docs: {}, t: { df: 0, docs: {}, l: { df: 1, docs: { 2: { tf: 1.0 } } } } },
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
                    e: { df: 0, docs: {}, r: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } } },
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
                e: { df: 2, docs: { 2: { tf: 2.0 }, 3: { tf: 1.4142135623730951 } } },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 4,
              docs: {
                0: { tf: 1.4142135623730951 },
                2: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 2,
                  docs: { 6: { tf: 1.4142135623730951 }, 7: { tf: 1.7320508075688772 } },
                },
              },
            },
          },
          v: {
            a: { df: 0, docs: {}, l: { df: 0, docs: {}, u: { df: 1, docs: { 3: { tf: 1.0 } } } } },
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
                    o: { df: 0, docs: {}, n: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            df: 0,
            docs: {},
            e: { b: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
            i: {
              d: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } }, df: 0, docs: {} },
              },
            },
          },
        },
      },
      breadcrumbs: {
        root: {
          1: {
            '.': { 6: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          2: {
            0: { 0: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } }, df: 0, docs: {} },
            df: 0,
            docs: {},
          },
          a: {
            c: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: { df: 0, docs: {}, s: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
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
                            t: { a: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
                                  t: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 2,
                      docs: { 2: { tf: 1.0 }, 6: { tf: 1.0 } },
                    },
                  },
                  v: { df: 1, docs: { 7: { tf: 1.0 } } },
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
                    docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
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
                                d: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
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
              df: 1,
              docs: { 2: { tf: 1.0 } },
            },
            df: 0,
            docs: {},
            n: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, h: { df: 1, docs: { 4: { tf: 1.0 } } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: { df: 1, docs: { 7: { tf: 1.0 } } },
              p: {
                '.': {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      '(': {
                        "'": {
                          a: {
                            c: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
                            df: 0,
                            docs: {},
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
                                            e: {
                                              df: 0,
                                              docs: {},
                                              n: { df: 1, docs: { 3: { tf: 1.0 } } },
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
                                                  t: { df: 1, docs: { 4: { tf: 1.0 } } },
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
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 1,
                docs: { 0: { tf: 1.0 } },
              },
            },
            r: { df: 0, docs: {}, e: { a: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} } },
            s: {
              df: 0,
              docs: {},
              y: {
                df: 0,
                docs: {},
                n: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            u: {
              df: 0,
              docs: {},
              t: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.7320508075688772 } } } },
            },
            w: {
              a: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, t: { df: 1, docs: { 7: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
          },
          b: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: { df: 0, docs: {}, r: { df: 1, docs: { 4: { tf: 1.0 } } } },
              },
              h: {
                a: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, f: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
                df: 0,
                docs: {},
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
                i: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.7320508075688772 } } },
              },
              df: 0,
              docs: {},
              t: { df: 1, docs: { 7: { tf: 1.0 } } },
              x: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                  o: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
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
                                                  t: { df: 1, docs: { 3: { tf: 1.0 } } },
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
                    2: { tf: 1.7320508075688772 },
                    3: { tf: 1.4142135623730951 },
                    6: { tf: 1.0 },
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
                c: { df: 0, docs: {}, k: { df: 1, docs: { 2: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: { df: 2, docs: { 2: { tf: 1.0 }, 6: { tf: 1.4142135623730951 } } },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, e: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                    n: { d: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.4142135623730951 } } } },
                },
              },
              n: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 2: { tf: 1.0 } } } },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 0, docs: {}, u: { df: 1, docs: { 3: { tf: 1.0 } } } },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: { df: 0, docs: {}, t: { df: 2, docs: { 0: { tf: 1.0 }, 7: { tf: 1.0 } } } },
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
                  o: { df: 0, docs: {}, m: { df: 1, docs: { 4: { tf: 1.0 } } } },
                },
              },
            },
          },
          d: {
            a: { df: 0, docs: {}, t: { a: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} } },
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
                              n: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
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
                                  t: { df: 1, docs: { 4: { tf: 1.4142135623730951 } } },
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
                        1: { tf: 2.0 },
                        2: { tf: 1.7320508075688772 },
                        3: { tf: 2.0 },
                        4: { tf: 2.0 },
                        5: { tf: 1.0 },
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
                  e: { df: 0, docs: {}, r: { df: 1, docs: { 0: { tf: 1.0 } } } },
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
                      l: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                docs: { 5: { tf: 1.4142135623730951 } },
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
            df: 0,
            docs: {},
            n: {
              a: {
                b: { df: 0, docs: {}, l: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                a: { df: 0, docs: {}, g: { df: 1, docs: { 6: { tf: 1.0 } } } },
                df: 0,
                docs: {},
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
                      df: 4,
                      docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 }, 4: { tf: 1.0 }, 7: { tf: 1.0 } },
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
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 2.23606797749979 } } } },
                  r: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                m: {
                  a: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  df: 1,
                  docs: { 6: { tf: 1.0 } },
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
                p: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                d: { df: 0, docs: {}, l: { df: 1, docs: { 4: { tf: 1.0 } } } },
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
                l: { df: 0, docs: {}, o: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } } },
              },
            },
          },
          i: {
            d: { df: 1, docs: { 2: { tf: 1.0 } } },
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
                t: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                        t: { df: 2, docs: { 1: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                o: { df: 0, docs: {}, k: { df: 1, docs: { 5: { tf: 1.0 } } } },
              },
            },
          },
          l: {
            a: { df: 0, docs: {}, r: { df: 0, docs: {}, g: { df: 1, docs: { 3: { tf: 1.0 } } } } },
            df: 0,
            docs: {},
            o: {
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                i: { c: { df: 1, docs: { 4: { tf: 1.7320508075688772 } } }, df: 0, docs: {} },
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
                    g: { df: 2, docs: { 0: { tf: 1.0 }, 6: { tf: 2.449489742783178 } } },
                  },
                  df: 0,
                  docs: {},
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
                          t: { df: 3, docs: { 0: { tf: 1.0 }, 6: { tf: 1.0 }, 7: { tf: 1.0 } } },
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
                a: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 5,
                    docs: {
                      1: { tf: 1.7320508075688772 },
                      2: { tf: 1.0 },
                      3: { tf: 1.0 },
                      4: { tf: 1.0 },
                      5: { tf: 1.4142135623730951 },
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
              t: {
                df: 0,
                docs: {},
                e: {
                  a: { df: 0, docs: {}, m: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
          },
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
                  docs: { 2: { tf: 1.4142135623730951 }, 3: { tf: 1.4142135623730951 } },
                },
              },
            },
          },
          p: {
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
            },
            r: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
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
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, v: { df: 1, docs: { 7: { tf: 1.0 } } } },
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 2, docs: { 3: { tf: 1.4142135623730951 }, 4: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    r: { c: { df: 1, docs: { 7: { tf: 1.0 } } }, df: 0, docs: {} },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 0, docs: {}, t: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                    n: { df: 3, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 }, 6: { tf: 1.0 } } },
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
                  docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } },
                  l: { df: 0, docs: {}, i: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  c: { df: 0, docs: {}, h: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: { c: { df: 1, docs: { 6: { tf: 1.0 } } }, df: 0, docs: {} },
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
                  df: 1,
                  docs: { 7: { tf: 1.0 } },
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
                                              df: 0,
                                              docs: {},
                                              n: {
                                                a: {
                                                  df: 0,
                                                  docs: {},
                                                  m: { df: 1, docs: { 7: { tf: 1.0 } } },
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
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 7: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            t: {
              a: {
                df: 0,
                docs: {},
                t: { df: 0, docs: {}, u: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } } },
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
                  i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.4142135623730951 } } } },
                },
              },
              c: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } },
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
                  e: { df: 0, docs: {}, m: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                                2: { tf: 1.4142135623730951 },
                                3: { tf: 1.4142135623730951 },
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
                              t: { df: 1, docs: { 4: { tf: 1.4142135623730951 } } },
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
                    1: { tf: 1.7320508075688772 },
                    2: { tf: 1.0 },
                    3: { tf: 1.4142135623730951 },
                    4: { tf: 1.0 },
                    5: { tf: 1.4142135623730951 },
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
                  df: 5,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    1: { tf: 1.0 },
                    2: { tf: 1.4142135623730951 },
                    6: { tf: 1.4142135623730951 },
                    7: { tf: 1.0 },
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
                                    d: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
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
              l: { df: 0, docs: {}, l: { df: 1, docs: { 2: { tf: 1.0 } } } },
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
                    g: { df: 0, docs: {}, h: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  },
                },
              },
            },
            i: { df: 0, docs: {}, t: { df: 0, docs: {}, l: { df: 1, docs: { 2: { tf: 1.0 } } } } },
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
                    e: { df: 0, docs: {}, r: { df: 2, docs: { 3: { tf: 1.0 }, 4: { tf: 1.0 } } } },
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
                e: { df: 2, docs: { 2: { tf: 2.0 }, 3: { tf: 1.4142135623730951 } } },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            s: {
              df: 4,
              docs: {
                0: { tf: 1.4142135623730951 },
                2: { tf: 1.0 },
                3: { tf: 1.0 },
                4: { tf: 1.0 },
              },
              e: {
                df: 0,
                docs: {},
                r: { df: 2, docs: { 6: { tf: 1.4142135623730951 }, 7: { tf: 2.23606797749979 } } },
              },
            },
          },
          v: {
            a: { df: 0, docs: {}, l: { df: 0, docs: {}, u: { df: 1, docs: { 3: { tf: 1.0 } } } } },
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
                    o: { df: 0, docs: {}, n: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } } },
                  },
                },
              },
            },
          },
          w: {
            df: 0,
            docs: {},
            e: {
              b: { df: 1, docs: { 6: { tf: 1.0 } } },
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
                t: { df: 0, docs: {}, h: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: { df: 0, docs: {}, n: { df: 1, docs: { 6: { tf: 1.0 } } } },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } }, df: 0, docs: {} },
              },
            },
          },
        },
      },
      title: {
        root: {
          a: {
            df: 0,
            docs: {},
            u: { df: 0, docs: {}, t: { df: 0, docs: {}, h: { df: 1, docs: { 7: { tf: 1.0 } } } } },
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
                            e: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
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
                                i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 1,
                      docs: { 1: { tf: 1.0 } },
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
                docs: { 5: { tf: 1.0 } },
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
            x: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: { df: 0, docs: {}, s: { df: 1, docs: { 6: { tf: 1.0 } } } },
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
                  a: { df: 0, docs: {}, g: { df: 1, docs: { 6: { tf: 1.0 } } } },
                  df: 0,
                  docs: {},
                },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
          },
          s: { d: { df: 0, docs: {}, k: { df: 1, docs: { 0: { tf: 1.0 } } } }, df: 0, docs: {} },
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
                          c: { df: 0, docs: {}, h: { df: 1, docs: { 3: { tf: 1.0 } } } },
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
                            i: { df: 0, docs: {}, t: { df: 1, docs: { 4: { tf: 1.0 } } } },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 1,
                  docs: { 1: { tf: 1.0 } },
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
                                  r: { d: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
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
            s: { df: 0, docs: {}, e: { df: 0, docs: {}, r: { df: 1, docs: { 7: { tf: 1.0 } } } } },
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
