safe_travels: {
    title: "I have been in the past 14 days in",
    options: {
        china: {
            title: "Mainland China",
            risk: 4,
        },
        schengen: {
            title: "Europe (Schengen Area)",
            risk: 4,
        },
        iran: {
            title: "Iran",
            risk: 4,
        },
        malaysia: {
            title: "Malaysia",
            risk: 4,
        },
        skorea: {
            title: "South Korea",
            risk: 4,
        },
        uk: {
            title: "UK",
            risk: 4,
        },
        other: {
            title: "other country",
            options: {
                public: {
                    title: "I travelled public",
                    options: {
                        seat: {
                            title: "2 or less seats apart from a COVID-19 positive person.",
                            risk: 3,
                        },
                        encounter: {
                            title: "I had contact with a COVID-19 positive person",
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
                                    title: "In a shared space.",
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
                        }
                    }
                },
                private: {
                    title: "I travelled private",
                    risk: 1,
                }
            }
        }
    }
}


