export default {
    sameindoor: {
        title: "Have you been in same indoor environment with a person with symptomatic laboratory-confirmed COVID-19",
        long:  "Have you been in same indoor environment (such as classsroom, healthcare waiting room) with a person with symptomatic laboratory-confirmed COVID-19",
        options: {
            yes: {
                title: "Yes",
                options: {
                    day: {
                        title: "24 hours befor symptoms onset until after treatment",
                        options: {
                            facetoface: {
                                title: "face to face",
                                options: {
                                    less: {
                                        title: "less then 15min",
                                        category: 2,
                                    },
                                    more: {
                                        title: "more then 15min",
                                        category: 3,
                                    }
                                }
                            },
                            sharedspace: {
                                title: "in a shared space",
                                options: {
                                    less: {
                                        title: "less then 2h",
                                        category: 2,
                                    },
                                    more: {
                                        title: "more then 2h",
                                        category: 3
                                    }
                                }
                            }
                        }
                    },
                    other: {
                        title: "Some other time",
                        risk: 1
                    }
                }
            },
            no: {
                title: "No",
                risk: 1,
            }
        }
    },
    sameindoor2: {
        title: "[2] Have you been in same indoor environment with a person with symptomatic laboratory-confirmed COVID-19",
        long:  "Have you been in same indoor environment (such as classsroom, healthcare waiting room) with a person with symptomatic laboratory-confirmed COVID-19",
        options: {
            yes: {
                title: "[2] Yes",
                options: {
                    day: {
                        title: "[2] 24 hours befor symptoms onset until after treatment",
                        options: {
                            facetoface: {
                                title: "[2] face to face",
                                options: {
                                    less: {
                                        title: "[2] less then 15min",
                                        category: 2,
                                    },
                                    more: {
                                        title: "[2] more then 15min",
                                        category: 3,
                                    }
                                }
                            },
                            sharedspace: {
                                title: "[2] in a shared space",
                                options: {
                                    less: {
                                        title: "[2] less then 2h",
                                        category: 2,
                                    },
                                    more: {
                                        title: "[2] more then 2h",
                                        category: 3
                                    }
                                }
                            }
                        }
                    },
                    other: {
                        title: "[2] Some other time",
                        risk: 1
                    }
                }
            },
            no: {
                title: "[2] No",
                risk: 1,
            }
        }
    }
}